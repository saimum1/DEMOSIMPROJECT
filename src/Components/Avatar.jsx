import React from 'react';

const Avatar = ({ imageUrl, alt, size }) => {
    return (
        <img
            src={imageUrl}
            alt={alt}
            className={`rounded-full ${size === 'large' ? 'h-16 w-16' : 'h-8 w-8'}`}
        />
    );
};

export default Avatar;