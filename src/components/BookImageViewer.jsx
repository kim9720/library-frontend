import React, { useState, useEffect } from 'react';

const BookImageViewer = ({ bookId }) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://kim.nuwarisha.org/public/api/books/${bookId}/image`);
        if (response.ok) {
          const imageData = await response.blob();
          setImageURL(URL.createObjectURL(imageData));
        } else {
          console.error('Failed to fetch book image');
        }
      } catch (error) {
        console.error('Error fetching book image:', error);
      }
    };

    fetchImage();
  }, [bookId]);

  return (
    <div>
      <img
        src={imageURL}
        alt={`Book ${bookId} Image`}
        style={{ width: '150px', height: '200px', objectFit: 'cover', marginBottom: '16px' }}
      />
    </div>
  );
};

export default BookImageViewer;
