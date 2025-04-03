import React, { useState } from "react";
import PhotoDisplay from "./components/PhotoDisplay";

const mockPhotos = {
  user: [
    { url: "user1.jpg", date: "2024-03-10" },
    { url: "user2.jpg", date: "2024-01-15" },
    { url: "user3.jpg", date: "2023-12-01" },
  ],
  friend: [
    { url: "friend1.jpg", date: "2024-02-20" },
    { url: "friend2.jpg", date: "2024-01-10" },
    { url: "friend3.jpg", date: "2023-11-25" },
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

  const handleSearch = () => {
    if (!inputDate) return;
    setUserPhoto(findClosestPhoto(mockPhotos.user, inputDate));
    setFriendPhoto(findClosestPhoto(mockPhotos.friend, inputDate));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Find Your Closest Photo</h1>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button onClick={handleSearch}>Find Photos</button>

      <PhotoDisplay title="Your Closest Photo" photo={userPhoto} />
      <PhotoDisplay title="Your Friend's Closest Photo" photo={friendPhoto} />
    </div>
  );
}
