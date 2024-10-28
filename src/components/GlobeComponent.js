import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import styled from 'styled-components';
import throttle from 'lodash/throttle';

const GlobeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white;
`;

const GlobeComponent = () => {
  const globeEl = useRef(null);
  const globeRef = useRef(null);
  const isDragging = useRef(false);
  const lastTouchX = useRef(0);
  const lastTouchY = useRef(0);

  useEffect(() => {
    if (globeEl.current) {
      const N = 30; // Further reduced the number of arcs
      const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
      }));

      const globe = Globe()(globeEl.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // Use optimized image
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png') // Use optimized image
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png') // Use optimized image
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(() => Math.random() * 0.5) // Reduce dash length
        .arcDashGap(() => Math.random() * 0.5) // Reduce dash gap
        .arcDashAnimateTime(() => Math.random() * 2000 + 500) // Reduce animation time
        .arcStroke(0.15) // Reduced stroke width
        .arcAltitude(0.08) // Reduced altitude
        .atmosphereColor('lightskyblue')
        .atmosphereAltitude(0.10)
        .enablePointerInteraction(false)
        .onGlobeClick(null)
        .onGlobeRightClick(null);

      globeRef.current = globe;

      const camera = globeRef.current.camera();

      const handleResize = throttle(() => {
        const { innerWidth: width, innerHeight: height } = window;

        globe.width(width).height(height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        if (width < 768) {
          camera.position.z = 500; // Further away for mobile view
        } else {
          camera.position.z = 350; // Closer for larger screens
        }

        camera.position.y = 0;
        globe.controls().enabled = false;
      }, 200); // Throttle resize event

      window.addEventListener('resize', handleResize);
      handleResize();

      const handleMouseMove = throttle((event) => {
        const mouseX = (event.clientX - window.innerWidth / 2) / 150; // Reduced sensitivity
        const mouseY = (event.clientY - window.innerHeight / 2) / 150; // Reduced sensitivity

        globe.scene().rotation.y += (mouseX - globe.scene().rotation.y) * 0.03; // Reduced rotation speed
        globe.scene().rotation.x += (-mouseY - globe.scene().rotation.x) * 0.03; // Reduced rotation speed
      }, 16); // Throttle mouse move event

      const handleTouchStart = (event) => {
        isDragging.current = true;
        lastTouchX.current = event.touches[0].clientX;
        lastTouchY.current = event.touches[0].clientY;
      };

      const handleTouchMove = (event) => {
        if (isDragging.current) {
          const deltaX = event.touches[0].clientX - lastTouchX.current;
          const deltaY = event.touches[0].clientY - lastTouchY.current;

          globe.scene().rotation.y += deltaX * 0.003; // Reduced touch sensitivity
          globe.scene().rotation.x += deltaY * 0.003; // Reduced touch sensitivity

          lastTouchX.current = event.touches[0].clientX;
          lastTouchY.current = event.touches[0].clientY;
        }
      };

      const handleTouchEnd = () => {
        isDragging.current = false;
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      const animate = () => {
        if (globeRef.current) {
          globe.scene().rotation.y += 0.0005; // Reduced rotation speed
          camera.lookAt(globe.scene().position);
          globeRef.current.renderer().render(globe.scene(), camera);
        }
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        globeRef.current = null;
      };
    } else {
      console.error("globeEl.current is null. Unable to render globe.");
    }
  }, []);

  return (
    <>
      <GlobeContainer ref={globeEl} />
      <ContentContainer>
        {/* Your page content goes here */}
      </ContentContainer>
    </>
  );
};

export default GlobeComponent;
