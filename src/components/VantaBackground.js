import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const VantaBackground = ({ children }) => {
   const vantaRef = useRef(null);

   useEffect(() => {
      const vantaEffect = NET({
         el: vantaRef.current,
         mouseControls: true,
         touchControls: true,
         gyroControls: false,
         minHeight: 200.00,
         minWidth: 200.00,
         scale: 1.00,
         scaleMobile: 1.00,
         color: 0xff3f81,
         backgroundColor: 0x0,
         maxDistance: 16.00,
         spacing: 11.00,
         THREE,
      });

      return () => {
         if (vantaEffect) vantaEffect.destroy();
      };
   }, []);

   return (
      <div ref={vantaRef} style={{ minHeight: '100vh', minWidth: '100vw', position: 'relative' }}>
         {children}
      </div>
   );
};

export default VantaBackground;
