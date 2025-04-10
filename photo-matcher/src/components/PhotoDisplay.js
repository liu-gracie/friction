// import React from "react";

// // Default birthdays
// const myBirthday = new Date("2004-10-04");
// const friendBirthday = new Date("2011-08-09");

// // Helper to calculate age from birthday and photo date
// function calculateAge(birthday, photoDate) {
//   const birth = new Date(birthday);
//   const photo = new Date(photoDate);
//   let age = photo.getFullYear() - birth.getFullYear();
//   const hasHadBirthday =
//     photo.getMonth() > birth.getMonth() ||
//     (photo.getMonth() === birth.getMonth() && photo.getDate() >= birth.getDate());
//   if (!hasHadBirthday) age -= 1;
//   return age;
// }

// export default function PhotoDisplay({ title = "", photo }) {
//   if (!photo) return null;

//   const isFriend = title.toLowerCase().includes("friend");
//   const age = isFriend
//     ? calculateAge(friendBirthday, photo.date)
//     : calculateAge(myBirthday, photo.date);

//   const label = isFriend
//     ? `Friend, ${age} years old`
//     : `Me, ${age} years old`;

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h2>{label}</h2>
//       <img src={photo.url} alt={label} width="200" />
//       <p>{photo.date}</p>
//     </div>
//   );
// }


import React from "react";

function calculateAge(birthday, photoDate) {
  const birth = new Date(birthday);
  const photo = new Date(photoDate);
  let age = photo.getFullYear() - birth.getFullYear();
  const hasHadBirthday =
    photo.getMonth() > birth.getMonth() ||
    (photo.getMonth() === birth.getMonth() && photo.getDate() >= birth.getDate());
  if (!hasHadBirthday) age -= 1;
  return age;
}

export default function PhotoDisplay({ title = "", photo, birthday }) {
  if (!photo || !birthday) return null;

  const age = calculateAge(birthday, photo.date);
  const label = `${title}, ${age} years old`;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{label}</h2>
      <img src={photo.url} alt={label} width="200" />
      <p>{photo.date}</p>
    </div>
  );
}
