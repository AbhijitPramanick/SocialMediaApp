import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/relatedUsers.module.css";

const RelatedUsers = ({ userId }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const [friends, setFriends] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
        setUser(response.data.find((d) => d.id === userId));
      } catch (err) {
        console.log(`Error while fetching friends : ${err}`);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (user && data) {
      const friendIds = user?.friends?.map((friend) => friend.id);

      setFriends(data.filter((userData) => friendIds.includes(userData.id)));
      setNonFriends(
        data.filter(
          (userData) =>
            userData.id !== userId && !friendIds.includes(userData.id)
        )
      );
    }
  }, [user, data]);

  const handleUnfriend = async (friendId) => {
    try {
      console.log(`Unfriending userId ${friendId}`);
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        friends: user.friends.filter((friend) => friend.id !== friendId),
      });
      const updatedUser = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      setUser(updatedUser.data);
    } catch (err) {
      console.log(`Error while unfriending friendId ${friendId} : ${err}`);
    }
  };

  const handleBefriend = async (nonFriendId) => {
    try {
      console.log(`Befriending userId ${nonFriendId}`);
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        friends: [...user.friends, { id: nonFriendId }],
      });
      const updatedUser = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      setUser(updatedUser.data);
    } catch (err) {
      console.log(`Error while befriending nonFriendId ${nonFriendId}, ${err}`);
    }
  };
  return (
    <div className={styles.relatedUsers_container}>
      <div className={styles.friendsDiv}>
        <div className={styles.userDiv_heading}>
          <h1>Friends{` (${friends.length})`}</h1>
        </div>
        <div className={styles.userDiv_usersList}>
          {friends.map((friendUser) => (
            <div key={friendUser.id} className={styles.userDiv_userDetail}>
              <div className={styles.userDiv_userDetail_left}>
                <img
                  src={friendUser.userPic}
                  alt="ProfilePic"
                  height={"200px"}
                  style={{ borderRadius: "40%" }}
                />
                <h2>{friendUser.name}</h2>
              </div>
              <div className={styles.userDiv_userDetail_right}>
                <button onClick={() => handleUnfriend(friendUser.id)}>
                  Unfriend {friendUser.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.nonFriendsDiv}>
        <div className={styles.userDiv_heading}>
          <h1>Other Users{` (${nonFriends.length})`}</h1>
        </div>
        <div className={styles.userDiv_usersList}>
          {nonFriends.map((nonFriendUser) => (
            <div key={nonFriendUser.id} className={styles.userDiv_userDetail}>
              <div className={styles.userDiv_userDetail_left}>
                <img
                  src={nonFriendUser.userPic}
                  alt="ProfilePic"
                  height={"200px"}
                  style={{ borderRadius: "40%" }}
                />
                <h2>{nonFriendUser.name}</h2>
              </div>
              <div className={styles.userDiv_userDetail_right}>
                <button onClick={() => handleBefriend(nonFriendUser.id)}>
                  Befriend {nonFriendUser.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedUsers;
