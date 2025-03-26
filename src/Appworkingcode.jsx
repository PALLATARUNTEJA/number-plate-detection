import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState('1');
  const [result, setResult] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [dehazedImageUrl, setDehazedImageUrl] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [showSocialLinks, setShowSocialLinks] = useState(false); // State for social links dropdown

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle social links dropdown
  const toggleSocialLinks = () => {
    setShowSocialLinks(!showSocialLinks);
  };

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

  // Handle steering wheel click to move page to top/bottom
  const handleSteeringClick = () => {
    if (window.scrollY === 0) {
      // If at the top, scroll to the bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      // If not at the top, scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle button click animations
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300); // Animation duration
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedImageUrl(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('option', option);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.result);
      setUploadedImageUrl(`http://localhost:5000/uploads/${response.data.image}`);
      if (response.data.dehazed_image) {
        setDehazedImageUrl(`http://localhost:5000/results/${response.data.dehazed_image}`);
      } else {
        setDehazedImageUrl('');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while processing the image.');
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Image */}
      <div className="background-image"></div>

      {/* Steering Wheel Decoration */}
      <div className="steering-wheel" onClick={handleSteeringClick}>
        <div className="peace-symbol"></div>
      </div>

      <header className="header">
        <h1>Number Plate Detection</h1>
        <div className="header-buttons">
          <button onClick={(e) => { toggleDarkMode(); handleButtonClick(e); }} className="theme-toggle car-button">
            {darkMode ? (
              <i className="fas fa-sun"></i> // Sun icon for dark mode
            ) : (
              <i className="fas fa-moon"></i> // Moon icon for light mode
            )}
          </button>
          <button onClick={(e) => { toggleSocialLinks(); handleButtonClick(e); }} className="more-button car-button">
            More {showSocialLinks ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
          </button>
          {showSocialLinks && (
            <div className="social-links">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> {/* LinkedIn icon */}
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> {/* GitHub icon */}
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> {/* Instagram icon */}
              </a>
              <a href="mailto:example@example.com">
                <i className="fas fa-envelope"></i> {/* Email icon */}
              </a>
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-upload">
            <label htmlFor="file-upload" className="custom-file-upload car-button" onClick={handleButtonClick}>
              Choose Image
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
          <div className="options">
            <label className="option">
              <input
                type="radio"
                name="option"
                value="1"
                checked={option === '1'}
                onChange={handleOptionChange}
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
              />
              <span>Option 2: Dehaze Image and Extract Number Plate</span>
            </label>
          </div>
          <button type="submit" className="submit-button car-button" onClick={handleButtonClick}>Upload and Process</button>
        </form>

        <div className="result-section">
          <h2>Result</h2>
          <div className="image-container">
            {uploadedImageUrl && (
              <div className="image-box">
                <h3>Uploaded Image</h3>
                <img src={uploadedImageUrl} alt="Uploaded Image" className="uploaded-image" />
              </div>
            )}
            {dehazedImageUrl && (
              <div className="image-box">
                <h3>Dehazed Image</h3>
                <img src={dehazedImageUrl} alt="Dehazed Image" className="dehazed-image" />
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
  );
}

export default App;