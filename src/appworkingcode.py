from flask import Flask, request, jsonify, send_from_directory
import cv2
import numpy as np
import os
import re
import torch
from paddleocr import PaddleOCR
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

# Initialize PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang='en')

# Load OWLv2 model (replace with your OWLv2 implementation)
def load_owlv2_model():
    # Example: Load a pre-trained object detection model
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  # Replace with OWLv2
    return model

owlv2_model = load_owlv2_model()

# Ensure upload and result directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# Dark Channel Prior for dehazing
def dark_channel_prior(image, window_size=15):
    """Compute the dark channel prior of an image."""
    min_channel = np.min(image, axis=2)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (window_size, window_size))
    dark_channel = cv2.erode(min_channel, kernel)
    return dark_channel

def estimate_atmospheric_light(image, dark_channel):
    """Estimate the atmospheric light from the dark channel."""
    flat_image = image.reshape(-1, 3)
    flat_dark = dark_channel.ravel()
    top_percent = 0.001  # Top 0.1% brightest pixels
    num_pixels = int(flat_dark.shape[0] * top_percent)
    indices = np.argpartition(flat_dark, -num_pixels)[-num_pixels:]
    atmospheric_light = np.max(flat_image[indices], axis=0)
    return atmospheric_light

def dehaze_image(image, window_size=15, omega=0.95, t0=0.1):
    """Dehaze an image using the Dark Channel Prior."""
    # Convert image to float32 for calculations
    image = image.astype(np.float32) / 255.0

    # Compute dark channel and atmospheric light
    dark_channel = dark_channel_prior(image, window_size)
    atmospheric_light = estimate_atmospheric_light(image, dark_channel)

    # Compute transmission map
    transmission = 1 - omega * dark_channel_prior(image / atmospheric_light, window_size)
    transmission = np.clip(transmission, t0, 1.0)

    # Recover the scene radiance
    dehazed_image = np.zeros_like(image)
    for i in range(3):
        dehazed_image[:, :, i] = (image[:, :, i] - atmospheric_light[i]) / transmission + atmospheric_light[i]

    # Clip and convert back to uint8
    dehazed_image = np.clip(dehazed_image, 0, 1)
    dehazed_image = (dehazed_image * 255).astype(np.uint8)

    return dehazed_image

# Detect number plate region using OWLv2
def detect_number_plate_region(image):
    """Detect the number plate region using OWLv2."""
    results = owlv2_model(image)  # Replace with OWLv2 inference
    plates = results.xyxy[0].cpu().numpy()  # Get bounding boxes
    if len(plates) > 0:
        x1, y1, x2, y2, conf, cls = plates[0]  # Get the first detected plate
        return int(x1), int(y1), int(x2), int(y2)
    return None

# Number plate detection and OCR
def detect_number_plate(image_path):
    image = cv2.imread(image_path)
    plate_region = detect_number_plate_region(image)
    if plate_region:
        x1, y1, x2, y2 = plate_region
        cropped_plate = image[y1:y2, x1:x2]
        result = ocr.ocr(cropped_plate)
        text = ""
        for line in result:
            for word in line:
                text += word[1][0] + " "

        # Filter out non-alphanumeric characters and spaces
        filtered_text = re.sub(r'[^a-zA-Z0-9\s]', '', text).strip()
        return filtered_text
    return "No number plate detected"

@app.route('/')
def index():
    return "Flask Backend for Number Plate Detection"

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    option = request.form.get('option')

    if option == '1':
        # Option 1: Extract number plate
        number_plate_text = detect_number_plate(file_path)
        return jsonify({
            "result": number_plate_text,
            "image": filename,
            "dehazed_image": None
        })

    elif option == '2':
        # Option 2: Dehaze image and extract number plate
        image = cv2.imread(file_path)
        dehazed_image = dehaze_image(image)
        dehazed_path = os.path.join(app.config['RESULT_FOLDER'], f"dehazed_{filename}")
        cv2.imwrite(dehazed_path, dehazed_image)

        number_plate_text = detect_number_plate(dehazed_path)
        return jsonify({
            "result": number_plate_text,
            "image": filename,
            "dehazed_image": f"dehazed_{filename}"
        })

    else:
        return jsonify({"error": "Invalid option"}), 400

@app.route('/uploads/<filename>')
def get_uploaded_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/results/<filename>')
def get_result_image(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)