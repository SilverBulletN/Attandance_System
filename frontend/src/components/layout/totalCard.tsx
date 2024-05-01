import React from "react";
import frame from "../../assets/frame.png";

const TotalCard = ({ count }) => {
  // Define the fixed height
  const height = 250;
  // Calculate the width based on the aspect ratio
  const aspectRatio = 653 / 333;
  const width = height * aspectRatio;

  return (
    <>
      <div
        className="text-4xl font-black m-2"
        style={{
          color: "#1961ad", // Deep blue color
          WebkitTextStroke: "1px white", // White text outline for contrast
        }}
      >
        SINH VIÊN THAM GIA
      </div>
      <div
        className="flex items-center justify-center p-4 "
        style={{
          backgroundImage: `url(${frame})`,
          backgroundSize: "cover",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div
          className="text-9xl font-bold"
          style={{
            color: "#1961ad", // Deep blue color
            WebkitTextStroke: "2px white", // White text outline for contrast
          }}
        >
          {count}
        </div>
      </div>
    </>
  );
};

export default TotalCard;
