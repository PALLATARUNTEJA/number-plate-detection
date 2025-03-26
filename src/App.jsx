// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file for styling

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }
// g
//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by Error Boundary:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <p>Something went wrong. Please try again later.</p>;
//     }
//     return this.props.children;
//   }
// }

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');
//   const [darkMode, setDarkMode] = useState(false); // State for dark mode
//   const [showSocialLinks, setShowSocialLinks] = useState(false); // State for social links dropdown

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // Toggle social links dropdown
//   const toggleSocialLinks = () => {
//     setShowSocialLinks(!showSocialLinks);
//   };

//   // Handle steering wheel rotation on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const steeringWheel = document.querySelector('.steering-wheel');
//       if (steeringWheel) {
//         const scrollPosition = window.scrollY;
//         steeringWheel.style.transform = `rotate(${scrollPosition}deg)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle steering wheel click to move page to top/bottom
//   const handleSteeringClick = () => {
//     if (window.scrollY === 0) {
//       // If at the top, scroll to the bottom
//       window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//     } else {
//       // If not at the top, scroll to the top
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Handle button click animations
//   const handleButtonClick = (e) => {
//     const button = e.currentTarget;
//     button.classList.add('clicked');
//     setTimeout(() => {
//       button.classList.remove('clicked');
//     }, 300); // Animation duration
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result || 'No text detected');
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//         {/* Background Image */}
//         <div className="background-image"></div>

//         {/* Steering Wheel Decoration (Right Side) */}
//         <div className="steering-wheel" onClick={handleSteeringClick}>
//           <div className="peace-symbol"></div>
//         </div>

//         {/* Second Steering Wheel Decoration (Left Side) */}
//         <div className="steering-wheel-left">
//           <div className="peace-symbol-left"></div>
//         </div>

//         <header className="header">
//           <h1>Number Plate Detection</h1>
//           <div className="header-buttons">
//             <button onClick={(e) => { toggleDarkMode(); handleButtonClick(e); }} className="theme-toggle car-button">
//               {darkMode ? (
//                 <i className="fas fa-sun"></i> // Sun icon for dark mode
//               ) : (
//                 <i className="fas fa-moon"></i> // Moon icon for light mode
//               )}
//             </button>
//             <button onClick={(e) => { toggleSocialLinks(); handleButtonClick(e); }} className="more-button car-button">
//               More {showSocialLinks ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
//             </button>
//             {showSocialLinks && (
//               <div className="social-links">
//                 <a href="https://www.linkedin.com/in/palla-tarun-teja-337746276/" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-linkedin"></i> {/* LinkedIn icon */}
//                 </a>
//                 <a href="https://github.com/PALLATARUNTEJA" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-github"></i> {/* GitHub icon */}
//                 </a>
//                 <a href="https://www.instagram.com/p_tarun_teja/" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-instagram"></i> {/* Instagram icon */}
//                 </a>
//                 <a href="mailto:pallatarunteja333@.com">
//                   <i className="fas fa-envelope"></i> {/* Email icon */}
//                 </a>
//               </div>
//             )}
//           </div>
//         </header>

//         <main className="main-content">
//           <form onSubmit={handleSubmit} className="upload-form">
//             <div className="file-upload">
//               <label htmlFor="file-upload" className="custom-file-upload car-button" onClick={handleButtonClick}>
//                 Choose Image
//               </label>
//               <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} required />
//             </div>
//             <div className="options">
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="1"
//                   checked={option === '1'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 1: Extract Number Plate</span>
//               </label>
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="2"
//                   checked={option === '2'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 2: Dehaze Image and Extract Number Plate</span>
//               </label>
//             </div>
//             <button type="submit" className="submit-button car-button" onClick={handleButtonClick}>Upload and Process</button>
//           </form>

//           <div className="result-section">
//             <h2>Result</h2>
//             <div className="image-container">
//               {uploadedImageUrl && (
//                 <div className="image-box">
//                   <h3>Uploaded Image</h3>
//                   <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//                 </div>
//               )}
//               {dehazedImageUrl && (
//                 <div className="image-box">
//                   <h3>Dehazed Image</h3>
//                   <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//                 </div>
//               )}
//             </div>
//             {result && (
//               <div className="result-text">
//                 <h3>Detected Number Plate</h3>
//                 <p>{result}</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;








// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './App.css';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by Error Boundary:", error, errorInfo);
//     this.setState({ errorInfo });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className={`error-fallback ${this.props.isDarkMode ? 'dark-mode' : ''}`}>
//           <h2>Something went wrong</h2>
//           <p className="error-message">{this.state.error?.toString()}</p>
//           <details className="error-details">
//             <summary>Error Details</summary>
//             <pre>{this.state.errorInfo?.componentStack}</pre>
//           </details>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="retry-button"
//           >
//             Refresh Page
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');
//   const [darkMode, setDarkMode] = useState(false);
//   const [showSocialLinks, setShowSocialLinks] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Handle steering wheel rotation on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const steeringWheel = document.querySelector('.steering-wheel');
//       if (steeringWheel) {
//         const scrollPosition = window.scrollY;
//         steeringWheel.style.transform = `rotate(${scrollPosition}deg)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Camera effects with proper cleanup
//   useEffect(() => {
//     let stream = null;

//     const startCamera = async () => {
//       try {
//         if (!showCamera) return;
        
//         setCameraError(null);
//         if (!navigator.mediaDevices?.getUserMedia) {
//           throw new Error('Camera not supported or no permission granted');
//         }

//         stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 1280 },
//             height: { ideal: 720 },
//             facingMode: 'environment'
//           }
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           setCameraActive(true);
//         }
//       } catch (err) {
//         console.error("Camera error:", err);
//         setCameraError(err.message || 'Camera access failed');
//         setShowCamera(false);
//       }
//     };

//     startCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//       setCameraActive(false);
//     };
//   }, [showCamera]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleSocialLinks = () => {
//     setShowSocialLinks(!showSocialLinks);
//   };

//   const handleSteeringClick = () => {
//     if (window.scrollY === 0) {
//       window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//     } else {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleButtonClick = (e) => {
//     const button = e.currentTarget;
//     button.classList.add('clicked');
//     setTimeout(() => {
//       button.classList.remove('clicked');
//     }, 300);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const captureImage = () => {
//     try {
//       if (!cameraActive || !videoRef.current || !canvasRef.current) {
//         throw new Error('Camera not ready');
//       }

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       if (!context) {
//         throw new Error('Could not get canvas context');
//       }

//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       canvas.toBlob((blob) => {
//         if (!blob) {
//           throw new Error('Image capture failed');
//         }

//         const fileName = `captured-${Date.now()}.jpg`;
//         const file = new File([blob], fileName, { type: 'image/jpeg' });
        
//         setFile(file);
//         setUploadedImageUrl(URL.createObjectURL(blob));
//         setShowCamera(false);
//       }, 'image/jpeg', 0.9);
//     } catch (err) {
//       console.error("Capture error:", err);
//       setCameraError(err.message || 'Failed to capture image');
//     }
//   };

//   const toggleCamera = (e) => {
//     handleButtonClick(e);
//     setShowCamera(prev => !prev);
//     setCameraError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image or capture one using the camera.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result || 'No text detected');
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <ErrorBoundary isDarkMode={darkMode}>
//       <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//         <div className="background-image"></div>

//         <div className="steering-wheel" onClick={handleSteeringClick}>
//           <div className="peace-symbol"></div>
//         </div>

//         <div className="steering-wheel-left">
//           <div className="peace-symbol-left"></div>
//         </div>

//         <header className="header">
//           <h1>Number Plate Detection</h1>
//           <div className="header-buttons">
//             <button onClick={(e) => { toggleDarkMode(); handleButtonClick(e); }} className="theme-toggle car-button">
//               {darkMode ? (
//                 <i className="fas fa-sun"></i>
//               ) : (
//                 <i className="fas fa-moon"></i>
//               )}
//             </button>
//             <button onClick={(e) => { toggleSocialLinks(); handleButtonClick(e); }} className="more-button car-button">
//               More {showSocialLinks ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
//             </button>
//             {showSocialLinks && (
//               <div className="social-links">
//                 <a href="https://www.linkedin.com/in/palla-tarun-teja-337746276/" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//                 <a href="https://github.com/PALLATARUNTEJA" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-github"></i>
//                 </a>
//                 <a href="https://www.instagram.com/p_tarun_teja/" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="mailto:pallatarunteja333@.com">
//                   <i className="fas fa-envelope"></i>
//                 </a>
//               </div>
//             )}
//           </div>
//         </header>

//         <main className="main-content">
//           <form onSubmit={handleSubmit} className="upload-form">
//             <div className="file-upload-container">
//               <div className="file-upload-wrapper">
//                 <label htmlFor="file-upload" className="custom-file-upload car-button" onClick={handleButtonClick}>
//                   <i className="fas fa-folder-open"></i> Choose File
//                 </label>
//                 <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
//               </div>
              
//               <div className="camera-button-wrapper">
//                 <button 
//                   type="button" 
//                   className={`custom-file-upload car-button ${showCamera ? 'active' : ''}`}
//                   onClick={toggleCamera}
//                 >
//                   <i className={`fas fa-${showCamera ? 'times' : 'camera'}`}></i> 
//                   {showCamera ? 'Close Camera' : 'Use Camera'}
//                 </button>
//               </div>
//             </div>

//             {showCamera && (
//               <div className="camera-container">
//                 {cameraError ? (
//                   <div className="camera-error">
//                     <p>{cameraError}</p>
//                     <button 
//                       onClick={() => setShowCamera(false)}
//                       className="car-button small"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <video 
//                       ref={videoRef} 
//                       autoPlay 
//                       playsInline 
//                       className="camera-feed"
//                       onError={() => setCameraError('Video stream error')}
//                     />
//                     <button
//                       type="button"
//                       className="capture-button car-button"
//                       onClick={(e) => {
//                         handleButtonClick(e);
//                         captureImage();
//                       }}
//                       disabled={!cameraActive}
//                     >
//                       <i className="fas fa-camera"></i> Capture
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}

//             <canvas ref={canvasRef} style={{ display: 'none' }} />
            
//             <div className="options">
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="1"
//                   checked={option === '1'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 1: Extract Number Plate</span>
//               </label>
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="2"
//                   checked={option === '2'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 2: Dehaze Image and Extract Number Plate</span>
//               </label>
//             </div>
//             <button type="submit" className="submit-button car-button" onClick={handleButtonClick}>Upload and Process</button>
//           </form>

//           <div className="result-section">
//             <h2>Result</h2>
//             <div className="image-container">
//               {uploadedImageUrl && (
//                 <div className="image-box">
//                   <h3>Uploaded Image</h3>
//                   <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//                 </div>
//               )}
//               {dehazedImageUrl && (
//                 <div className="image-box">
//                   <h3>Dehazed Image</h3>
//                   <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//                 </div>
//               )}
//             </div>
//             {result && (
//               <div className="result-text">
//                 <h3>Detected Number Plate</h3>
//                 <p>{result}</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;









import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`error-fallback ${this.props.isDarkMode ? 'dark-mode' : ''}`}>
          <h2>Something went wrong</h2>
          <p className="error-message">{this.state.error?.toString()}</p>
          <details className="error-details">
            <summary>Error Details</summary>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState('1');
  const [result, setResult] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [dehazedImageUrl, setDehazedImageUrl] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle steering wheel rotation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const steeringWheel = document.querySelector('.steering-wheel');
      if (steeringWheel) {
        const scrollPosition = window.scrollY;
        steeringWheel.style.transform = `rotate(${scrollPosition}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Camera effects with proper cleanup
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        if (!showCamera) return;
        
        setCameraError(null);
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Camera not supported or no permission granted');
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'environment'
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError(err.message || 'Camera access failed');
        setShowCamera(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setCameraActive(false);
    };
  }, [showCamera]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSocialLinks = () => {
    setShowSocialLinks(!showSocialLinks);
  };

  const handleSteeringClick = () => {
    if (window.scrollY === 0) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (!selectedFile.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    setFile(selectedFile);
    setUploadedImageUrl(URL.createObjectURL(selectedFile));
    setDehazedImageUrl('');
    setResult('');
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const captureImage = () => {
    try {
      if (!cameraActive || !videoRef.current || !canvasRef.current) {
        throw new Error('Camera not ready');
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Image capture failed');
        }

        const fileName = `captured-${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        
        setFile(file);
        setUploadedImageUrl(URL.createObjectURL(blob));
        setDehazedImageUrl('');
        setResult('');
        setShowCamera(false);
      }, 'image/jpeg', 0.9);
    } catch (err) {
      console.error("Capture error:", err);
      setCameraError(err.message || 'Failed to capture image');
    }
  };

  const toggleCamera = (e) => {
    handleButtonClick(e);
    setShowCamera(prev => !prev);
    setCameraError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload an image or capture one using the camera.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('option', option);

    try {
      // Updated API endpoints to work with GitHub Pages proxy
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.result || 'No text detected');
      setUploadedImageUrl(`/api/uploads/${response.data.image}`);
      if (response.data.dehazed_image) {
        setDehazedImageUrl(`/api/results/${response.data.dehazed_image}`);
      } else {
        setDehazedImageUrl('');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`An error occurred: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary isDarkMode={darkMode}>
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="background-image"></div>

        <div className="steering-wheel" onClick={handleSteeringClick}>
          <div className="peace-symbol"></div>
        </div>

        <div className="steering-wheel-left">
          <div className="peace-symbol-left"></div>
        </div>

        <header className="header">
          <h1>Number Plate Detection</h1>
          <div className="header-buttons">
            <button 
              onClick={(e) => { toggleDarkMode(); handleButtonClick(e); }} 
              className="theme-toggle car-button"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <button 
              onClick={(e) => { toggleSocialLinks(); handleButtonClick(e); }} 
              className="more-button car-button"
              aria-label={showSocialLinks ? 'Hide social links' : 'Show social links'}
            >
              More {showSocialLinks ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
            </button>
            {showSocialLinks && (
              <div className="social-links">
                <a href="https://www.linkedin.com/in/palla-tarun-teja-337746276/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/PALLATARUNTEJA" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.instagram.com/p_tarun_teja/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="mailto:pallatarunteja333@gmail.com" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            )}
          </div>
        </header>

        <main className="main-content">
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="file-upload-container">
              <div className="file-upload-wrapper">
                <label htmlFor="file-upload" className="custom-file-upload car-button" onClick={handleButtonClick}>
                  <i className="fas fa-folder-open"></i> Choose File
                </label>
                <input 
                  id="file-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  aria-label="Upload image file"
                />
              </div>
              
              <div className="camera-button-wrapper">
                <button 
                  type="button" 
                  className={`custom-file-upload car-button ${showCamera ? 'active' : ''}`}
                  onClick={toggleCamera}
                  aria-label={showCamera ? 'Close camera' : 'Open camera'}
                >
                  <i className={`fas fa-${showCamera ? 'times' : 'camera'}`}></i> 
                  {showCamera ? 'Close Camera' : 'Use Camera'}
                </button>
              </div>
            </div>

            {showCamera && (
              <div className="camera-container">
                {cameraError ? (
                  <div className="camera-error">
                    <p>{cameraError}</p>
                    <button 
                      onClick={() => setShowCamera(false)}
                      className="car-button small"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="camera-feed"
                      onError={() => setCameraError('Video stream error')}
                      aria-label="Camera feed"
                    />
                    <button
                      type="button"
                      className="capture-button car-button"
                      onClick={(e) => {
                        handleButtonClick(e);
                        captureImage();
                      }}
                      disabled={!cameraActive}
                      aria-label="Capture image"
                    >
                      <i className="fas fa-camera"></i> Capture
                    </button>
                  </>
                )}
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} aria-hidden="true" />
            
            <div className="options">
              <label className="option">
                <input
                  type="radio"
                  name="option"
                  value="1"
                  checked={option === '1'}
                  onChange={handleOptionChange}
                  aria-label="Option 1: Extract Number Plate"
                />
                <span>Option 1: Extract Number Plate</span>
              </label>
              <label className="option">
                <input
                  type="radio"
                  name="option"
                  value="2"
                  checked={option === '2'}
                  onChange={handleOptionChange}
                  aria-label="Option 2: Dehaze Image and Extract Number Plate"
                />
                <span>Option 2: Dehaze Image and Extract Number Plate</span>
              </label>
            </div>
            <button 
              type="submit" 
              className="submit-button car-button" 
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                'Upload and Process'
              )}
            </button>
          </form>

          <div className="result-section">
            <h2>Result</h2>
            <div className="image-container">
              {uploadedImageUrl && (
                <div className="image-box">
                  <h3>Uploaded Image</h3>
                  <img 
                    src={uploadedImageUrl} 
                    alt="Uploaded preview" 
                    className="uploaded-image"
                    onError={() => setUploadedImageUrl('')}
                  />
                </div>
              )}
              {dehazedImageUrl && (
                <div className="image-box">
                  <h3>Dehazed Image</h3>
                  <img 
                    src={dehazedImageUrl} 
                    alt="Processed result" 
                    className="dehazed-image"
                    onError={() => setDehazedImageUrl('')}
                  />
                </div>
              )}
            </div>
            {result && (
              <div className="result-text">
                <h3>Detected Number Plate</h3>
                <p>{result}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;









// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './App.css';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by Error Boundary:", error, errorInfo);
//     this.setState({ errorInfo });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className={`error-fallback ${this.props.isDarkMode ? 'dark-mode' : ''}`}>
//           <h2>Something went wrong</h2>
//           <p className="error-message">{this.state.error?.toString()}</p>
//           <details className="error-details">
//             <summary>Error Details</summary>
//             <pre>{this.state.errorInfo?.componentStack}</pre>
//           </details>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="retry-button"
//           >
//             Refresh Page
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');
//   const [darkMode, setDarkMode] = useState(false);
//   const [showSocialLinks, setShowSocialLinks] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Handle steering wheel rotation on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const steeringWheel = document.querySelector('.steering-wheel');
//       if (steeringWheel) {
//         const scrollPosition = window.scrollY;
//         steeringWheel.style.transform = `rotate(${scrollPosition}deg)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Camera effects with proper cleanup
//   useEffect(() => {
//     let stream = null;

//     const startCamera = async () => {
//       try {
//         if (!showCamera) return;
        
//         setCameraError(null);
//         if (!navigator.mediaDevices?.getUserMedia) {
//           throw new Error('Camera not supported or no permission granted');
//         }

//         stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 1280 },
//             height: { ideal: 720 },
//             facingMode: 'environment'
//           }
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           setCameraActive(true);
//         }
//       } catch (err) {
//         console.error("Camera error:", err);
//         setCameraError(err.message || 'Camera access failed');
//         setShowCamera(false);
//       }
//     };

//     startCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//       setCameraActive(false);
//     };
//   }, [showCamera]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleSocialLinks = () => {
//     setShowSocialLinks(!showSocialLinks);
//   };

//   const handleSteeringClick = () => {
//     if (window.scrollY === 0) {
//       window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//     } else {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleButtonClick = (e) => {
//     const button = e.currentTarget;
//     button.classList.add('clicked');
//     setTimeout(() => {
//       button.classList.remove('clicked');
//     }, 300);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const captureImage = () => {
//     try {
//       if (!cameraActive || !videoRef.current || !canvasRef.current) {
//         throw new Error('Camera not ready');
//       }

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       if (!context) {
//         throw new Error('Could not get canvas context');
//       }

//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       canvas.toBlob((blob) => {
//         if (!blob) {
//           throw new Error('Image capture failed');
//         }

//         const fileName = `captured-${Date.now()}.jpg`;
//         const file = new File([blob], fileName, { type: 'image/jpeg' });
        
//         setFile(file);
//         setUploadedImageUrl(URL.createObjectURL(blob));
//         setShowCamera(false);
//       }, 'image/jpeg', 0.9);
//     } catch (err) {
//       console.error("Capture error:", err);
//       setCameraError(err.message || 'Failed to capture image');
//     }
//   };

//   const toggleCamera = (e) => {
//     handleButtonClick(e);
//     setShowCamera(prev => !prev);
//     setCameraError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image or capture one using the camera.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result || 'No text detected');
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <ErrorBoundary isDarkMode={darkMode}>
//       <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//         <div className="background-image"></div>

//         <div className="steering-wheel" onClick={handleSteeringClick}>
//           <div className="peace-symbol"></div>
//         </div>

//         <div className="steering-wheel-left">
//           <div className="peace-symbol-left"></div>
//         </div>

//         <header className="header">
//           <h1>Number Plate Detection</h1>
//           <div className="header-buttons">
//             <button onClick={(e) => { toggleDarkMode(); handleButtonClick(e); }} className="theme-toggle car-button">
//               {darkMode ? (
//                 <i className="fas fa-sun"></i>
//               ) : (
//                 <i className="fas fa-moon"></i>
//               )}
//             </button>
//             <button onClick={(e) => { toggleSocialLinks(); handleButtonClick(e); }} className="more-button car-button">
//               More {showSocialLinks ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
//             </button>
//             {showSocialLinks && (
//               <div className="social-links">
//                 <a href="https://www.linkedin.com/in/palla-tarun-teja-337746276/" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//                 <a href="https://github.com/PALLATARUNTEJA" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-github"></i>
//                 </a>
//                 <a href="https://www.instagram.com/p_tarun_teja/" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="mailto:pallatarunteja333@.com">
//                   <i className="fas fa-envelope"></i>
//                 </a>
//               </div>
//             )}
//           </div>
//         </header>

//         <main className="main-content">
//           <form onSubmit={handleSubmit} className="upload-form">
//             <div className="file-upload">
//               <label htmlFor="file-upload" className="custom-file-upload car-button" onClick={handleButtonClick}>
//                 <i className="fas fa-folder-open"></i> Choose Image
//               </label>
//               <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
              
//               <button 
//                 type="button" 
//                 className={`custom-file-upload car-button ${showCamera ? 'active' : ''}`}
//                 onClick={toggleCamera}
//               >
//                 <i className={`fas fa-${showCamera ? 'times' : 'camera'}`}></i> 
//                 {showCamera ? 'Close Camera' : 'Use Camera'}
//               </button>
//             </div>

//             {showCamera && (
//               <div className="camera-container">
//                 {cameraError ? (
//                   <div className="camera-error">
//                     <p>{cameraError}</p>
//                     <button 
//                       onClick={() => setShowCamera(false)}
//                       className="car-button small"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <video 
//                       ref={videoRef} 
//                       autoPlay 
//                       playsInline 
//                       className="camera-feed"
//                       onError={() => setCameraError('Video stream error')}
//                     />
//                     <button
//                       type="button"
//                       className="capture-button car-button"
//                       onClick={(e) => {
//                         handleButtonClick(e);
//                         captureImage();
//                       }}
//                       disabled={!cameraActive}
//                     >
//                       <i className="fas fa-camera"></i> Capture
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}

//             <canvas ref={canvasRef} style={{ display: 'none' }} />
            
//             <div className="options">
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="1"
//                   checked={option === '1'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 1: Extract Number Plate</span>
//               </label>
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="2"
//                   checked={option === '2'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 2: Dehaze Image and Extract Number Plate</span>
//               </label>
//             </div>
//             <button type="submit" className="submit-button car-button" onClick={handleButtonClick}>Upload and Process</button>
//           </form>

//           <div className="result-section">
//             <h2>Result</h2>
//             <div className="image-container">
//               {uploadedImageUrl && (
//                 <div className="image-box">
//                   <h3>Uploaded Image</h3>
//                   <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//                 </div>
//               )}
//               {dehazedImageUrl && (
//                 <div className="image-box">
//                   <h3>Dehazed Image</h3>
//                   <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//                 </div>
//               )}
//             </div>
//             {result && (
//               <div className="result-text">
//                 <h3>Detected Number Plate</h3>
//                 <p>{result}</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;







// import React, { useState, useRef } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Tesseract from "tesseract.js";
// import "./App.css";

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState("1");
//   const [result, setResult] = useState("");
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [dehazedImageUrl, setDehazedImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const canvasRef = useRef(null);

//   // Load YOLOv8 model
//   const loadModel = async () => {
//     const model = await tf.loadGraphModel("/path/to/yolov8/model.json"); // Replace with your YOLOv8 model path
//     return model;
//   };

//   // Dark Channel Prior for dehazing
//   const darkChannelPrior = (imageData) => {
//     const pixels = imageData.data;
//     for (let i = 0; i < pixels.length; i += 4) {
//       const r = pixels[i];
//       const g = pixels[i + 1];
//       const b = pixels[i + 2];
//       const min = Math.min(r, g, b);
//       pixels[i] = min;
//       pixels[i + 1] = min;
//       pixels[i + 2] = min;
//     }
//     return imageData;
//   };

//   // Dehaze image
//   const dehazeImage = (image) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = image.width;
//     canvas.height = image.height;
//     ctx.drawImage(image, 0, 0);
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const dehazedData = darkChannelPrior(imageData);
//     ctx.putImageData(dehazedData, 0, 0);
//     return canvas.toDataURL();
//   };

//   // Detect number plate using YOLOv8
//   const detectNumberPlate = async (image) => {
//     const model = await loadModel();
//     const tensor = tf.browser.fromPixels(image).expandDims(0);
//     const predictions = await model.predict(tensor);
//     const boxes = predictions[0].arraySync()[0]; // Extract bounding boxes
//     return boxes; // Return detected bounding boxes
//   };

//   // Extract text using PaddleOCR (Tesseract.js as a placeholder)
//   const extractText = async (imageUrl) => {
//     const { data } = await Tesseract.recognize(imageUrl, "eng", {
//       logger: (m) => console.log(m),
//     });
//     return data.text.replace(/[^a-zA-Z0-9]/g, ""); // Filter out non-alphanumeric characters
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setUploadedImageUrl(URL.createObjectURL(selectedFile));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please upload an image.");
//       return;
//     }

//     setLoading(true);
//     const image = new Image();
//     image.src = uploadedImageUrl;
//     image.onload = async () => {
//       try {
//         let processedImageUrl = uploadedImageUrl;

//         // Dehaze image if option 2 is selected
//         if (option === "2") {
//           processedImageUrl = dehazeImage(image);
//           setDehazedImageUrl(processedImageUrl);
//         }

//         // Detect number plate using YOLOv8
//         const boxes = await detectNumberPlate(image);
//         if (boxes.length === 0) {
//           setResult("No number plate detected.");
//           return;
//         }

//         // Crop the detected number plate
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         const [x1, y1, x2, y2] = boxes[0]; // Use the first detected box
//         ctx.drawImage(image, x1, y1, x2 - x1, y2 - y1, 0, 0, canvas.width, canvas.height);
//         const croppedImageUrl = canvas.toDataURL();

//         // Extract text from the cropped image using PaddleOCR (Tesseract.js as a placeholder)
//         const text = await extractText(croppedImageUrl);
//         setResult(text);
//       } catch (error) {
//         console.error("Error processing image:", error);
//         setResult("An error occurred while processing the image.");
//       } finally {
//         setLoading(false);
//       }
//     };
//   };

//   return (
//     <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
//       {/* Header */}
//       <header className="header">
//         <h1>Number Plate Detection</h1>
//       </header>

//       {/* Main Content */}
//       <main className="main-content">
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-upload">
//             <label htmlFor="file-upload" className="custom-file-upload car-button">
//               Choose Image
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//           <div className="options">
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="1"
//                 checked={option === "1"}
//                 onChange={(e) => setOption(e.target.value)}
//               />
//               <span>Option 1: Extract Number Plate</span>
//             </label>
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="2"
//                 checked={option === "2"}
//                 onChange={(e) => setOption(e.target.value)}
//               />
//               <span>Option 2: Dehaze Image and Extract Number Plate</span>
//             </label>
//           </div>
//           <button type="submit" className="submit-button car-button" disabled={loading}>
//             {loading ? "Processing..." : "Upload and Process"}
//           </button>
//         </form>

//         {/* Result Section */}
//         <div className="result-section">
//           <h2>Result</h2>
//           <div className="image-container">
//             {uploadedImageUrl && (
//               <div className="image-box">
//                 <h3>Uploaded Image</h3>
//                 <img src={uploadedImageUrl} alt="Uploaded" className="uploaded-image" />
//               </div>
//             )}
//             {dehazedImageUrl && (
//               <div className="image-box">
//                 <h3>Dehazed Image</h3>
//                 <img src={dehazedImageUrl} alt="Dehazed" className="dehazed-image" />
//               </div>
//             )}
//           </div>
//           {result && (
//             <div className="result-text">
//               <h3>Detected Number Plate</h3>
//               <p>{result}</p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Hidden Canvas for Image Processing */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//     </div>
//   );
// }

// export default App;









// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file for styling

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result || 'No text detected');
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//       setError('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setError('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <div className="app-container">
//       <header className="header">
//         <h1>Number Plate Detection</h1>
//       </header>

//       <main className="main-content">
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-upload">
//             <label htmlFor="file-upload" className="custom-file-upload">
//               Choose Image
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} required />
//           </div>
//           <div className="options">
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="1"
//                 checked={option === '1'}
//                 onChange={handleOptionChange}
//               />
//               <span>Option 1: Extract Number Plate</span>
//             </label>
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="2"
//                 checked={option === '2'}
//                 onChange={handleOptionChange}
//               />
//               <span>Option 2: Dehaze Image and Extract Number Plate</span>
//             </label>
//           </div>
//           <button type="submit" className="submit-button">Upload and Process</button>
//         </form>

//         {error && <p className="error-message">{error}</p>}

//         <div className="result-section">
//           <h2>Result</h2>
//           <div className="image-container">
//             {uploadedImageUrl && (
//               <div className="image-box">
//                 <h3>Uploaded Image</h3>
//                 <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//               </div>
//             )}
//             {dehazedImageUrl && (
//               <div className="image-box">
//                 <h3>Dehazed Image</h3>
//                 <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//               </div>
//             )}
//           </div>
//           {result && (
//             <div className="result-text">
//               <h3>Detected Number Plate</h3>
//               <p>{result}</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by Error Boundary:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="error-fallback">
//           <h2>Something went wrong!</h2>
//           <p>{this.state.error.message}</p>
//           <button onClick={() => window.location.reload()}>Reload Page</button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result || 'No text detected');
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setError('An error occurred while processing the image.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className="app-container">
//         <header className="header">
//           <h1>Number Plate Detection</h1>
//         </header>

//         <main className="main-content">
//           <form onSubmit={handleSubmit} className="upload-form">
//             <div className="file-upload">
//               <label htmlFor="file-upload" className="custom-file-upload">
//                 Choose Image
//               </label>
//               <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} required />
//             </div>
//             <div className="options">
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="1"
//                   checked={option === '1'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 1: Extract Number Plate</span>
//               </label>
//               <label className="option">
//                 <input
//                   type="radio"
//                   name="option"
//                   value="2"
//                   checked={option === '2'}
//                   onChange={handleOptionChange}
//                 />
//                 <span>Option 2: Dehaze Image and Extract Number Plate</span>
//               </label>
//             </div>
//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? 'Processing...' : 'Upload and Process'}
//             </button>
//           </form>

//           {error && <p className="error-message">{error}</p>}

//           <div className="result-section">
//             <h2>Result</h2>
//             <div className="image-container">
//               {uploadedImageUrl && (
//                 <div className="image-box">
//                   <h3>Uploaded Image</h3>
//                   <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//                 </div>
//               )}
//               {dehazedImageUrl && (
//                 <div className="image-box">
//                   <h3>Dehazed Image</h3>
//                   <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//                 </div>
//               )}
//             </div>
//             {result && (
//               <div className="result-text">
//                 <h3>Detected Number Plate</h3>
//                 <p>{result}</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file for styling

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');
//   const [darkMode, setDarkMode] = useState(false); // State for dark mode
//   const [showSocialLinks, setShowSocialLinks] = useState(false); // State for social links dropdown

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // Toggle social links dropdown
//   const toggleSocialLinks = () => {
//     setShowSocialLinks(!showSocialLinks);
//   };

//   // Handle steering wheel rotation on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const steeringWheel = document.querySelector('.steering-wheel');
//       if (steeringWheel) {
//         const scrollPosition = window.scrollY;
//         steeringWheel.style.transform = `rotate(${scrollPosition}deg)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle steering wheel click to move page to top/bottom
//   const handleSteeringClick = () => {
//     if (window.scrollY === 0) {
//       // If at the top, scroll to the bottom
//       window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//     } else {
//       // If not at the top, scroll to the top
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Handle button click animations
//   const handleButtonClick = (e) => {
//     const button = e.currentTarget;
//     button.classList.add('clicked');
//     setTimeout(() => {
//       button.classList.remove('clicked');
//     }, 300); // Animation duration
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result);
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//       {/* Background Image */}
//       <div className="background-image"></div>

//       {/* Steering Wheel Decoration (Right Side) */}
//       <div className="steering-wheel" onClick={handleSteeringClick}>
//         <div className="peace-symbol"></div>
//       </div>

//       {/* Second Steering Wheel Decoration (Left Side) */}
//       <div className="steering-wheel-left">
//         <div className="peace-symbol-left"></div>
//       </div>

//       <header className="header">
//         <h1>Number Plate Detection</h1>
//         <div className="header-buttons">
//           <button onClick={(e) => { toggleDarkMode(); handleButtonClick(e); }} className="theme-toggle car-button">
//             {darkMode ? (
//               <i className="fas fa-sun"></i> // Sun icon for dark mode
//             ) : (
//               <i className="fas fa-moon"></i> // Moon icon for light mode
//             )}
//           </button>
//           <button onClick={(e) => { toggleSocialLinks(); handleButtonClick(e); }} className="more-button car-button">
//             More {showSocialLinks ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
//           </button>
//           {showSocialLinks && (
//             <div className="social-links">
//               <a href="https://www.linkedin.com/in/palla-tarun-teja-337746276/" target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-linkedin"></i> {/* LinkedIn icon */}
//               </a>
//               <a href="https://github.com/PALLATARUNTEJA" target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-github"></i> {/* GitHub icon */}
//               </a>
//               <a href="https://www.instagram.com/p_tarun_teja/" target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-instagram"></i> {/* Instagram icon */}
//               </a>
//               <a href="mailto:pallatarunteja333@.com">
//                 <i className="fas fa-envelope"></i> {/* Email icon */}
//               </a>
//             </div>
//           )}
//         </div>
//       </header>

//       <main className="main-content">
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-upload">
//             <label htmlFor="file-upload" className="custom-file-upload car-button" onClick={handleButtonClick}>
//               Choose Image
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} required />
//           </div>
//           <div className="options">
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="1"
//                 checked={option === '1'}
//                 onChange={handleOptionChange}
//               />
//               <span>Option 1: Extract Number Plate</span>
//             </label>
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="2"
//                 checked={option === '2'}
//                 onChange={handleOptionChange}
//               />
//               <span>Option 2: Dehaze Image and Extract Number Plate</span>
//             </label>
//           </div>
//           <button type="submit" className="submit-button car-button" onClick={handleButtonClick}>Upload and Process</button>
//         </form>

//         <div className="result-section">
//           <h2>Result</h2>
//           <div className="image-container">
//             {uploadedImageUrl && (
//               <div className="image-box">
//                 <h3>Uploaded Image</h3>
//                 <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//               </div>
//             )}
//             {dehazedImageUrl && (
//               <div className="image-box">
//                 <h3>Dehazed Image</h3>
//                 <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//               </div>
//             )}
//           </div>
//           {result && (
//             <div className="result-text">
//               <h3>Detected Number Plate</h3>
//               <p>{result}</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;













// app3.css

   
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file for styling

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result);
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <div className="app-container">
//       <header className="header">
//         <h1>Number Plate Detection</h1>
//       </header>
//       <main className="main-content">
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-upload">
//             <label htmlFor="file-upload" className="custom-file-upload">
//               Choose Image
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} required />
//           </div>
//           <div className="options">
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="1"
//                 checked={option === '1'}
//                 onChange={handleOptionChange}
//               />
//               <span>Option 1: Extract Number Plate</span>
//             </label>
//             <label className="option">
//               <input
//                 type="radio"
//                 name="option"
//                 value="2"
//                 checked={option === '2'}
//                 onChange={handleOptionChange}
//               />
//               <span>Option 2: Dehaze Image and Extract Number Plate</span>
//             </label>
//           </div>
//           <button type="submit" className="submit-button">Upload and Process</button>
//         </form>

//         <div className="result-section">
//           <h2>Result</h2>
//           {result && <p className="result-text">Number Plate: {result}</p>}
//           {uploadedImageUrl && (
//             <div className="image-container">
//               <h3>Uploaded Image</h3>
//               <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
//             </div>
//           )}
//           {dehazedImageUrl && (
//             <div className="image-container">
//               <h3>Dehazed Image</h3>
//               <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;








//app2.css


// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file for styling

// function App() {
//   const [file, setFile] = useState(null);
//   const [option, setOption] = useState('1');
//   const [result, setResult] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [dehazedImageUrl, setDehazedImageUrl] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadedImageUrl(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
//   };

//   const handleOptionChange = (e) => {
//     setOption(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('option', option);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResult(response.data.result);
//       setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
//       if (response.data.dehazed_image) {
//         setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
//       } else {
//         setDehazedImageUrl('');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('An error occurred while processing the image.');
//     }
//   };

//   return (
//     <div className="app-container">
//       <header className="header">
//         <h1>Number Plate Detection</h1>
//       </header>

//       <main className="main-content">
//         <form onSubmit={handleSubmit} className="upload-form">
//           <div className="file-upload-section">
//             <label htmlFor="file-upload" className="file-upload-label">
//               Choose Image
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               required
//             />
//           </div>

//           <div className="options-section">
//             <label className="option-label">
//               <input
//                 type="radio"
//                 name="option"
//                 value="1"
//                 checked={option === '1'}
//                 onChange={handleOptionChange}
//               />
//               Option 1: Extract Number Plate
//             </label>
//             <label className="option-label">
//               <input
//                 type="radio"
//                 name="option"
//                 value="2"
//                 checked={option === '2'}
//                 onChange={handleOptionChange}
//               />
//               Option 2: Dehaze Image and Extract Number Plate
//             </label>
//           </div>

//           <button type="submit" className="submit-button">
//             Upload and Process
//           </button>
//         </form>

//         <div className="result-section">
//           <h2>Result</h2>
//           {result && <p className="result-text">Number Plate: {result}</p>}

//           <div className="image-container">
//             {uploadedImageUrl && (
//               <div className="image-box">
//                 <h3>Uploaded Image</h3>
//                 <img
//                   src={uploadedImageUrl}
//                   alt="Uploaded Image"
//                   className="uploaded-image"
//                 />
//               </div>
//             )}

//             {dehazedImageUrl && (
//               <div className="image-box">
//                 <h3>Dehazed Image</h3>
//                 <img
//                   src={dehazedImageUrl}
//                   alt="Dehazed Image"
//                   className="dehazed-image"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
