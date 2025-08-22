import React from 'react';

const ScrollbarContent = ({children}) => {
    return (
        <div style={{ maxHeight: '35rem', overflow: 'auto' }}>
            <div style={{ minHeight: '36rem' }}>{children}</div>
        </div>
    );
};

export default ScrollbarContent;