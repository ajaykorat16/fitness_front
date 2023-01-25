import React from "react";

const CookingInstructions = ({ instructionData }) => {
  return (
    <div className="cooking-instructions-cii">
      {instructionData && instructionData.length > 0 ? (
        <>
          <h2>Cooking Instructions</h2>
          {instructionData && instructionData.map((item) => <p>{item.text}</p>)}
        </>
      ) : null}

      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/LDtHa9-BE10"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}
      {/* <div className="share-social-ssij">
        <h2>Share</h2>
        <div className="share-social-icon-ssi">
          <Link to="#">
            <FacebookOutlined />
          </Link>
          <Link to="#">
            <MessageOutlined />
          </Link>
          <Link to="#">
            <TwitterOutlined />
          </Link>
          <Link to="#">
            <LinkedinOutlined />
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default CookingInstructions;
