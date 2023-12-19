import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Friends from "./Friends";
import AddPost from "./AddPost";
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchUser = () => {
      setUser(location?.state?.user);
      axios
        .get("http://localhost:3000/users")
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, []);
  // console.log(user);
  // console.log(data);
  console.log(`User ID : ${user?.id}`);
  return (
    <>
      <div>
        <h1>{`Name : ${user?.name}`}</h1>
        <img
          src={user?.userPic}
          alt="ProfilePic"
          height={"300px"}
          style={{ borderRadius: "10%" }}
        />
        <h2>{`Gender : ${user?.gender}`}</h2>
        <h2>{`Date of Birth : ${user?.dateOfBirth}`}</h2>
        <h2>{`Profession : ${user?.profession}`}</h2>
        <h2>{`Education : ${user?.education}`}</h2>
        <h3>{`Bio : ${user?.bio}`}</h3>
        <h3>{`Location : ${user?.location}`}</h3>
      </div>
      <Friends userId={user?.id} />
      <AddPost userId={user?.id} />
    </>
  );
};

export default UserProfile;
