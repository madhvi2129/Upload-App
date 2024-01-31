import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/images'); // Use absolute URL
        console.log('Images received:', response.data);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);

    try {
      await axios.post('http://localhost:3000/upload', formData); // Use absolute URL

      console.log('File uploaded successfully');

      // Refresh the list of images after successful upload
      const response = await axios.get('http://localhost:3000/images'); // Use absolute URL
      console.log('Images received:', response.data);
      setImages(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={uploadFile}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>

      <div>
        <h2>Images</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img
                src={`http://localhost:3000/uploads/${image}`}
                alt={`Image ${index}`}
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
