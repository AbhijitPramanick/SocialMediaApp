import axios from "axios";
import styles from "../styles/userProfile.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RelatedUsers from "./RelatedUsers";
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
    <div className={styles.userProfileContent}>
      <div className={styles.userDetails}>
        <div className={styles.userDetails_name}>
          <h1>{`Name : ${user?.name}`}</h1>
        </div>
        <div className={styles.userDetails_content}>
          <img src={user?.userPic} alt="ProfilePic" />
          <div className={styles.userDetails_more}>
            <h2>{`Gender : ${user?.gender}`}</h2>
            <h2>{`Date of Birth : ${user?.dateOfBirth}`}</h2>
            <h2>{`Profession : ${user?.profession}`}</h2>
            <h2>{`Education : ${user?.education}`}</h2>
            <h3>{`Bio : ${user?.bio}`}</h3>
            <h3>{`Location : ${user?.location}`}</h3>
          </div>
        </div>
      </div>
      <RelatedUsers userId={user?.id} />
      <AddPost userId={user?.id} />
    </div>
  );
};

export default UserProfile;
