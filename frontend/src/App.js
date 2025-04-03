import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [dateInput, setDateInput] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to fetch photos for the entered date
    try {
      const response = await axios.post("http://localhost:5000/api/getPhotos", {
        date: dateInput,
      });
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div className="App">
      <h1>Photo Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Date (YYYY-MM-DD):
          <input
            type="date"
            value={dateInput}
            onChange={handleDateChange}
          />
        </label>
        <button type="submit">Search Photos</button>
      </form>

      <div>
        <h2>Matching Photos:</h2>
        <div>
          {photos.length === 0 ? (
            <p>No photos found.</p>
          ) : (
            photos.map((photo, index) => (
              <div key={index}>
                <img src={photo.url} alt={photo.date} width="200" />
                <p>{photo.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
