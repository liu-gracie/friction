import React from "react";

export default function PhotoDisplay({ title, photo }) {
  if (!photo) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{title}</h2>
      <img src={photo.url} alt={title} width="200" />
      <p>Date: {photo.date}</p>
    </div>
  );
}
