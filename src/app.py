# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import cv2
# from PIL import Image
# import torch
# from paddleocr import PaddleOCR
# from transformers import OwlViTProcessor, OwlViTForObjectDetection

# app = Flask(__name__)
# CORS(app)  # Allow React to communicate with Flask

# # Load PaddleOCR model
# ocr = PaddleOCR(use_angle_cls=True, use_gpu=torch.cuda.is_available(), lang="en")

# # Load OWL-ViT model for number plate detection
# processor = OwlViTProcessor.from_pretrained("google/owlvit-base-patch32")
# model = OwlViTForObjectDetection.from_pretrained("google/owlvit-base-patch32")

# def detect_number_plate(image):
#     """Detect number plates using OWL-ViT"""
#     inputs = processor(images=image, text=["number plate", "license plate"], return_tensors="pt")
#     with torch.no_grad():
#         outputs = model(**inputs)

#     scores = outputs["logits"][0].softmax(-1)
#     boxes = outputs["pred_boxes"][0]
#     detected_plates = []

#     for score, box in zip(scores, boxes):
#         if score[1] > 0.5:  # Confidence threshold
#             h, w, _ = image.shape
#             box = (box * torch.tensor([w, h, w, h])).numpy().astype(int)
#             detected_plates.append(box)
#     return detected_plates

# def extract_text_from_plate(image, boxes):
#     """Extract text from detected number plates"""
#     results = []
#     for box in boxes:
#         x1, y1, x2, y2 = box
#         plate_roi = image[y1:y2, x1:x2]
#         result = ocr.ocr(plate_roi, cls=True)
#         extracted_text = " ".join([line[1][0] for line in result[0]]) if result[0] else ""
#         results.append(extracted_text)
#     return results

# @app.route('/predict', methods=['POST'])
# def predict():
#     """API endpoint for number plate detection and text extraction"""
#     file = request.files['image']
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     # Read and process image
#     npimg = np.frombuffer(file.read(), np.uint8)
#     image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

#     # Detect number plates
#     plates = detect_number_plate(image)
#     texts = extract_text_from_plate(image, plates)

#     return jsonify({"plates": plates, "texts": texts})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
