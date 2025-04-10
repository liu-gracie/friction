import React, { useState } from "react";
import PhotoDisplay from "./components/PhotoDisplay";
import "./index.css"; 

const mockPhotos = {
  user: [
    { url: "user1.png", date: "2024-03-10" },
    { url: "user2.png", date: "2024-01-15" },
    { url: "user3.png", date: "2023-12-01" },
  ],
  friend: [
    { url: "friend1.png", date: "2024-02-20" },
    { url: "friend2.png", date: "2024-01-10" },
    { url: "friend3.png", date: "2023-11-25" },
  ],
};

function findClosestPhoto(photos, targetDate) {
  return photos.reduce((closest, photo) => {
    const currentDiff = Math.abs(new Date(photo.date) - new Date(targetDate));
    const closestDiff = Math.abs(new Date(closest.date) - new Date(targetDate));
    return currentDiff < closestDiff ? photo : closest;
  });
}

function generateDateRange(startDate, endDate) {
  const dates = [];
  let current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function App() {
  const [inputDate, setInputDate] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [friendPhoto, setFriendPhoto] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const dateRange = generateDateRange("2023-11-01", "2024-03-31");
  const [sliderIndex, setSliderIndex] = useState(0);

  // ✅ Generate notches INSIDE the component, AFTER dateRange is defined
  const allPhotoDates = [...mockPhotos.user, ...mockPhotos.friend]
    .map(p => p.date)
    .filter((value, index, self) => self.indexOf(value) === index);

  const photoNotchPositions = allPhotoDates.map(date => {
    const index = dateRange.indexOf(date);
    return index >= 0 ? (index / (dateRange.length - 1)) * 100 : null;
  }).filter(pos => pos !== null);

  const handleSearch = () => {
    if (!inputDate) return;
    setUserPhoto(findClosestPhoto(mockPhotos.user, inputDate));
    setFriendPhoto(findClosestPhoto(mockPhotos.friend, inputDate));
  };

  if (!hasStarted) {
    return (
      <div style={{ textAlign: "center", padding: "50px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 className="floating">how are you my friend? <br /> and where have you been?</h1>
        <p className="body-text">while the universe is so big, I'm glad to exist at the same time with you</p>
        <button className="button" onClick={() => setHasStarted(true)}>begin</button>
        <div className="bottom">
          <p className="small-text">please note, this website requires access to your photo gallery to continue. by clicking on the "begin" button, you consent to this website accessing your photos. all photos and personal information will not be saved on this website.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 className="header">on this day, what were we like?</h1>

      <div className="slider-wrapper">
        <div className="notch-track">
          {photoNotchPositions.map((pos, idx) => (
            <div
              key={idx}
              className="notch"
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>

        <input
          type="range"
          min="0"
          max={dateRange.length - 1}
          value={sliderIndex}
          onChange={(e) => {
            const index = parseInt(e.target.value);
            setSliderIndex(index);
            setInputDate(dateRange[index]);
          }}
          className="date-slider"
        />

        <div className="hover-date">{inputDate}</div>
        <button className="button" onClick={handleSearch}>let's find out ⟶</button>
      </div>

      <div className="photos" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "100px" }}>
        <PhotoDisplay title="[me] during this time" photo={userPhoto} />
        <PhotoDisplay title="[friend] during this time" photo={friendPhoto} />
      </div>
    </div>
  );
}
