import React from "react";

const Memes = ({ template, onClick }) => {
  return (
    <img
      style={{ width: 200 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
  );
};

export default Memes;
