
import React, { useEffect } from 'react';

const CursorRelativeBackground: React.FC = () => {
    useEffect(() => {
        const root = document.getElementById('root');

        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const offsetX = (mouseY / window.innerHeight - 5) * 5;
            const offsetY = (mouseX / window.innerWidth - 5) * 5;

            if (root) {
                root.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div id="root" style={{
            margin: 0,
            padding: 0,
            height: '100%',
            overflow: 'hidden',
            backgroundImage: `url("D:\\Licence\\rpgFE\\rpg-frontend\\public\\figmaExports\\BGimage.png")`,
            backgroundSize: 'cover',
            transition: 'backgroundPosition 0.3s ease-out'
        }}>
        </div>
    );
};

export default CursorRelativeBackground;
