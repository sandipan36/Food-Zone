// CompanyLogos.js
import React, { useRef, useEffect, useState } from 'react';

const CompanyLogos = ({ logos }) => {
  const containerRef = useRef(null);
  const [visibleLogos, setVisibleLogos] = useState(logos);

  // Function to reset scroll position when it reaches the end
  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      container.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const interval = setInterval(() => {
      handleScroll();
      container.scrollLeft += 1; // Adjust scroll speed as needed
    }, 10); // Adjust scroll interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex overflow-x-hidden h-auto" ref={containerRef}>
      {visibleLogos.map((logo, index) => (
        <img key={index} src={logo} alt={`Company Logo ${index + 1}`} className="h-40 w-60 mx-2 rounded-lg" />
      ))}
    </div>
  );
};

export default CompanyLogos;
