import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AddPost = ({ userId }) => {
  console.log(`UserId : `, userId);
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [postNewText, setPostNewText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchUser = async () => {
    if (userId) {
      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(`Error while fetching user : ${err}`);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    setUserPosts(user.posts || []);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && userPosts && postText) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          posts: [...userPosts, { id: uuidv4(), text: postText }],
        });
        fetchUser();
        setPostText("");
      } catch (err) {
        console.log(`Error while axios.post : ${err}`);
      }
    } else {
      console.log(
        `Cannot post because either user, userPosts or postText is not available.`
      );
    }
  };
  const handleModifyPost = async (postId, operationType) => {
    if (user && userPosts) {
      console.log(`operationType : `, operationType);
      console.log(`postId : `, postId);
      if (operationType === "edit") {
        try {
          console.log(`userPosts : `, userPosts);
          const updatedPosts = userPosts.map((post) => {
            console.log(`Post : ${post}`);
            return post.id === postId ? { ...post, text: postNewText } : post;
          });
          console.log(`updatedPosts : `, updatedPosts);
          await axios.patch(`http://localhost:3000/users/${userId}`, {
            posts: [...updatedPosts],
          });
          fetchUser();
          setPostNewText("");
        } catch (err) {
          console.log(`Error while editing the post : ${err}`);
        }
      }
    }
  };

  const onEdit = (p) => {
    setIsEditing(p.id);
    setPostNewText(p.text);
  };
  return (
    <>
      <div>
        <h1>Post</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            name="postText"
            id="postText"
            cols="30"
            rows="5"
            placeholder="Enter text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button type="submit">Click to post</button>
        </form>
      </div>
      <div>
        <h2>Previous posts</h2>
        {userPosts?.map((post) => (
          <div key={post?.id}>
            <p>{post?.text}</p>
            {post.id === isEditing ? (
              <div>
                <textarea
                  name="postText"
                  id="postText"
                  cols="30"
                  rows="5"
                  placeholder="Enter text"
                  value={postNewText}
                  onChange={(e) => setPostNewText(e.target.value)}
                />
                <button
                  onClick={() => {
                    setIsEditing(false);
                    return handleModifyPost(post.id, "edit");
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <button onClick={() => onEdit(post)}>Edit Post</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddPost;
