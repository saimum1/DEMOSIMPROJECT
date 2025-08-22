import React from 'react';
import {ArrowUp, Download} from 'lucide-react';

function AvatarSolid({ color, size }) {
    const styles = {
        position: 'relative',
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: '50%',
    };

    const badgeSize = 15;
    const badgeStyles = {
        position: 'absolute',
        top: -badgeSize / 4,
        right: -badgeSize / 4,
        width: badgeSize,
        height: badgeSize,
        backgroundColor: '#3498db', // Light blue color
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={styles}>
            <div style={badgeStyles}>
                <ArrowUp color="white" size={badgeSize * 0.6} />
            </div>
        </div>
    );
}

export default AvatarSolid;