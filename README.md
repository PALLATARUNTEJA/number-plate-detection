# Number Plate Detection System (Frontend)

A **frontend** application built using **React.js (Vite)** to interact with a Flask-based backend for number plate detection using **YOLOv8/PaddleOCR**. This project allows users to upload images or capture them via a camera to detect number plates with optional dehazing.

## 🚀 Features
- Upload images or capture via camera
- Two processing modes:
  - Direct number plate extraction
  - Image dehazing + number plate extraction
- Dark/Light mode toggle
- Real-time camera capture
- Error boundary for crash protection

## 💻 Technologies Used
- **Frontend**: React.js, Vite, Axios
- **Backend (External)**: Flask, YOLOv8, PaddleOCR, Dark Channel Prior
- **ML**: PyTorch, NumPy, OpenCV

## ⚙️ How to Run the Project
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/PALLATARUNTEJA/number-plate-detection.git
   ```
2. Navigate to the project directory:
   ```bash
   cd number-plate-detection-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash 
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

## 📂 Project Structure
```
number-plate-detection-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main pages/views
│   ├── assets/           # Images and static assets
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
├── public/               # Static files
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## 📡 Backend Setup (Optional)
If you want to run the complete system, clone and set up the backend:
```bash
   git clone https://github.com/PALLATARUNTEJA/back-end-for-number-plate-detection-.git
```
Follow the backend's README for installation and setup instructions.

## 🚀 Future Enhancements
- Implement drag-and-drop image upload
- Add support for video input
- Improve UI with animations and better styling

## 🙌 Contributing
Contributions are welcome! Feel free to fork the project, make changes, and submit a pull request.

## 📜 License
This project is licensed to **PALLATARUNTEJA**.

