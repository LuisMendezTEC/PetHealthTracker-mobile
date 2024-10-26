import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import animationData from '../animations/Animation - 1729899326570.json'; // Replace with your animation file path

const AnimationComponent: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
    useEffect(() => {
        // Set a timeout to simulate the duration of the animation
        const timer = setTimeout(onAnimationComplete, 3000); // Adjust the duration as needed

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    return (
        <div className="animation-container">
            <Lottie animationData={animationData} />
        </div>
    );
};

export default AnimationComponent;
