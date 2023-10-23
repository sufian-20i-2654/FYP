// ImageSlider.js
import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images, onImageSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    onImageSelect(images[index]);
  };

  return (
    <div className="image-slider">
      <button onClick={prevImage}>&lt;</button>
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        onClick={() => selectImage(currentImageIndex)}
      />

      <div className="image-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={index === currentImageIndex ? 'selected' : ''}
            onClick={() => selectImage(index)}
          />
        ))}
      </div>
      <button onClick={nextImage}>&gt;</button>
    </div>
  );
};

export default ImageSlider;
