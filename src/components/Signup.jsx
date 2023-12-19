import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const [education, setEducation] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  //   console.log(
  //     name,
  //     email,
  //     password,
  //     dob,
  //     location,
  //     gender,
  //     bio,
  //     profession,
  //     education,
  //     profilePic
  //   );
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("dob", dob);
    formData.append("location", location);
    formData.append("gender", gender);
    formData.append("bio", bio);
    formData.append("profession", profession);
    formData.append("education", education);

    if (profilePic) {
      formData.append("profilePic", profilePic, profilePic.name);
    }
    try {
      const res = await axios.post("http://localhost:3000/users", formData);
      console.log(res);
    } catch (err) {
      console.log(`Error in Signup : ${err}`);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form action="#" onSubmit={handleClick}>
        <div>
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="userName"
            name="userName"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="userEmail"
            name="userEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="userPassword"
            name="userPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userDob">Date of Birth:</label>
          <input
            type="date"
            placeholder="Enter Dob"
            id="userDob"
            name="userDob"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userLocation">Location:</label>
          <input
            type="text"
            placeholder="Enter Location"
            id="userLocation"
            name="userLocation"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="transgender">Transgender</option>
            <option value="genderqueer">Genderqueer</option>
            <option value="agender">Agender</option>
            <option value="bigender">Bigender</option>
            <option value="two-spirit">Two-Spirit</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="userBio">Bio:</label>
          <textarea
            type="text"
            placeholder="Enter Bio"
            rows={6}
            cols={40}
            name="userBio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userProfession">Profession:</label>
          <input
            type="text"
            placeholder="Enter Profession"
            id="userProfession"
            name="userProfession"
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userEducation">Education:</label>
          <input
            type="text"
            placeholder="Enter Education"
            id="userEducation"
            name="userEducation"
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userProfilePic">Profile Picture:</label>
          {profilePic ? (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="Profile Pic"
              height={"200px"}
            />
          ) : (
            <img
              src="./profile-icon.png"
              alt="No Profile Pic"
              height={"200px"}
            />
          )}

          <input
            type="file"
            id="userProfilePic"
            name="userProfilePic"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
