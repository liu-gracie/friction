import React, { useState } from "react";
import PhotoDisplay from "./components/PhotoDisplay";


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

export default function App() {
  const [inputDate, setInputDate] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [friendPhoto, setFriendPhoto] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); // <-- for landing page

  const handleSearch = () => {
    if (!inputDate) return;
    setUserPhoto(findClosestPhoto(mockPhotos.user, inputDate));
    setFriendPhoto(findClosestPhoto(mockPhotos.friend, inputDate));
  };

  if (!hasStarted) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1 className="floating">hi.</h1>
        <button onClick={() => setHasStarted(true)}>begin</button>
      </div>
    );
    
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>how are you? and where have you been?</h1>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button onClick={handleSearch}>go -{">"}</button>

      <PhotoDisplay title="[me] during this time" photo={userPhoto} />
      <PhotoDisplay title="[friend] during this time" photo={friendPhoto} />
    </div>
  );
}
