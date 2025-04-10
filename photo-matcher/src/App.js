import React, { useState } from "react";
import PhotoDisplay from "./components/PhotoDisplay";
import "./index.css"; 

const mockPhotos = {
  user: [
    { url: "user1.jpg", date: "2019-03-02" },
    { url: "user2.jpg", date: "2021-01-06" },
    { url: "user3.jpg", date: "2022-02-21" },
    { url: "user4.jpg", date: "2022-03-12" },
    { url: "user5.jpg", date: "2022-04-06" },
    { url: "user6.jpg", date: "2022-06-06" },
    { url: "user7.jpg", date: "2019-03-02" },
    { url: "user8.jpg", date: "2022-10-04" },
    { url: "user9.jpg", date: "2023-02-03" },
    { url: "user10.jpg", date: "2023-06-20" },
    { url: "user11.jpg", date: "2023-07-03" },
    { url: "user12.jpg", date: "2023-12-11" },
    { url: "user13.jpg", date: "2024-01-16" },
    { url: "user14.jpg", date: "2023-03-24" },
  ],
  friend: [
    { url: "friend1.jpg", date: "2019-02-20" },
    { url: "friend2.jpg", date: "2019-08-01" },
    { url: "friend3.jpg", date: "2021-05-17" },
    { url: "friend4.jpg", date: "2021-12-03" },
    { url: "friend5.jpg", date: "2022-06-09" },
    { url: "friend6.jpg", date: "2022-07-25" },
    { url: "friend7.jpg", date: "2022-12-29" },
    { url: "friend8.jpg", date: "2023-05-29" },
    { url: "friend9.jpg", date: "2023-05-31" },
    { url: "friend10.jpg", date: "2023-06-27" },
    { url: "friend11.jpg", date: "2023-06-28" },
    { url: "friend12.jpg", date: "2023-07-19" },
    { url: "friend13.jpg", date: "2024-01-16" },
    { url: "friend14.jpg", date: "2024-03-26" },
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
  const dateRange = generateDateRange("2019-01-01", "2024-03-31");
  const [sliderIndex, setSliderIndex] = useState(0);

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
