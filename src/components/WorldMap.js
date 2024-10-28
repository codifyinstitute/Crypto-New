import React, { useState } from 'react';
import WorldMap from 'react-svg-worldmap';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 1; /* Maintain a responsive aspect ratio */
  margin: 2rem auto;
  position: relative;
  background: none; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 430px) {
    width: 100%;
  }

  @media (min-width: 1025px) {
  figure{
    zoom: 1.7;
    svg{
      width: 200%;
    }
  }
  
}
  
  
`;

const StyledWorldMap = styled(WorldMap)`
  width: 100%;
  height: 100%;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  pointer-events: none;
  transform: translate(-50%, 10px); /* Adjust position to appear just below the cursor */
`;

const CustomWorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const data = [
    { country: "us", color: "orange" }, { country: "ca", color: "orange" },
    { country: "br", color: "orange" }, { country: "ru", color: "white" },
    { country: "cn", color: "orange" }, { country: "au", color: "white" },
    { country: "in", color: "orange" }, { country: "za", color: "white" },
    { country: "eg", color: "orange" }, { country: "jp", color: "white" },
    { country: "de", color: "orange" }, { country: "fr", color: "white" },
    { country: "gb", color: "orange" }, { country: "it", color: "white" },
    { country: "es", color: "orange" }, { country: "mx", color: "white" },
    { country: "ar", color: "orange" }, { country: "cl", color: "white" },
    { country: "co", color: "orange" }, { country: "pe", color: "white" },
    { country: "ve", color: "orange" }, { country: "kr", color: "white" },
    { country: "kp", color: "orange" }, { country: "vn", color: "orange" },
    { country: "th", color: "orange" }, { country: "id", color: "white" },
    { country: "my", color: "orange" }, { country: "ph", color: "white" },
    { country: "ng", color: "orange" }, { country: "ke", color: "white" },
    { country: "et", color: "orange" }, { country: "tz", color: "white" },
    { country: "gh", color: "orange" }, { country: "dz", color: "white" },
    { country: "ma", color: "orange" }, { country: "sd", color: "white" },
    { country: "iq", color: "orange" }, { country: "ir", color: "white" },
    { country: "tr", color: "orange" }, { country: "sy", color: "white" },
    { country: "sa", color: "orange" }, { country: "ae", color: "white" },
    { country: "pk", color: "orange" }, { country: "af", color: "white" },
    { country: "bd", color: "orange" }, { country: "lk", color: "white" },
    { country: "np", color: "orange" }, { country: "bt", color: "white" },
    { country: "mn", color: "orange" }, { country: "uz", color: "white" },
    { country: "kz", color: "orange" }, { country: "tj", color: "white" },
    { country: "kg", color: "orange" }, { country: "tm", color: "white" },
    { country: "pl", color: "orange" }, { country: "cz", color: "white" },
    { country: "sk", color: "orange" }, { country: "hu", color: "white" },
    { country: "ro", color: "orange" }, { country: "bg", color: "white" },
    { country: "gr", color: "orange" }, { country: "rs", color: "white" },
    { country: "hr", color: "orange" }, { country: "si", color: "white" },
    { country: "at", color: "orange" }, { country: "ch", color: "white" },
    { country: "nl", color: "orange" }, { country: "be", color: "white" },
    { country: "lu", color: "orange" }, { country: "dk", color: "white" },
    { country: "se", color: "orange" }, { country: "no", color: "white" },
    { country: "fi", color: "orange" }, { country: "ee", color: "white" },
    { country: "lv", color: "orange" }, { country: "lt", color: "white" },
    { country: "ua", color: "orange" }, { country: "by", color: "white" },
    { country: "md", color: "orange" }, { country: "ge", color: "white" },
    { country: "az", color: "orange" }, { country: "am", color: "white" },
    { country: "il", color: "orange" }, { country: "jo", color: "white" },
    { country: "lb", color: "orange" }, { country: "cy", color: "white" },
    { country: "qa", color: "orange" }, { country: "bh", color: "white" },
    { country: "kw", color: "orange" }, { country: "om", color: "white" },
    { country: "ye", color: "orange" }, { country: "jo", color: "white" },
    { country: "mu", color: "orange" }, { country: "mg", color: "white" },
    { country: "zm", color: "orange" }, { country: "zw", color: "white" },
    { country: "na", color: "orange" }, { country: "bw", color: "white" },
    { country: "sz", color: "orange" }, { country: "ls", color: "white" },
    { country: "ao", color: "orange" }, { country: "mz", color: "white" },
    { country: "zm", color: "orange" }, { country: "zm", color: "white" },
    // Add more countries as needed
  ];

  const handleHover = (event, countryName, isoCode, value, prefix, suffix) => {
    setTooltipContent(countryName);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const styleFunction = (context) => {
    const countryData = data.find((item) => item.country === context.countryCode.toLowerCase());
    return {
      fill: countryData ? countryData.color : 'white',
      stroke: 'black',
      strokeWidth: 0.5,
    };
  };

  return (
    <MapContainer>
      <StyledWorldMap
        data={data.map(item => ({ country: item.country.toUpperCase(), value: 1 }))}
        styleFunction={styleFunction}
        backgroundColor="transparent"
        onHover={handleHover}
      />
      {tooltipContent && (
        <Tooltip style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
          {tooltipContent}
        </Tooltip>
      )}
    </MapContainer>
  );
};

export default CustomWorldMap;
