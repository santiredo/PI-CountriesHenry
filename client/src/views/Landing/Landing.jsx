import React, { useRef, useState, useEffect } from 'react';
import background from '../../assets/landingBackground.png';
import style from './landing.module.css';
import { useNavigate } from 'react-router-dom';

export default function Landing () {
    const canvasRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
  
    const backgroundColor = [97, 175, 154]; // Valor RGB del color de fondo
  
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.src = background

        image.onload = () => {
            canvas.width = canvas.clientWidth; // Ancho con un 5% menos
            canvas.height = canvas.clientHeight; // Alto con un 5% menos
            
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }

        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        console.log(isHovering)
    }, [isHovering])
  
    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const pixel = ctx.getImageData(x, y, 1, 1).data;

        // Compara los valores RGB del píxel con el color de fondo
        const isPixelBackground = (
        pixel[0] === backgroundColor[0] &&
        pixel[1] === backgroundColor[1] &&
        pixel[2] === backgroundColor[2]
        );

        setIsHovering(isPixelBackground);

    };

    const navigate = useNavigate()

    const handleHome = () => {
        isHovering && navigate('/home')
    }
  
    return (
      <div className={style.landingPage}> {/* Corregido aquí */}
        <canvas onClick={handleHome} ref={canvasRef} className={!isHovering ? style.canvas : style.canvasHover} />
        {
            isHovering && <h1 className={style.title}>Click to see the project</h1>
        }
      </div>
    );
};
