import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(`Password : ${password}`);
    try {
      const user = data.find((user) => user.email === email);
      // console.log(typeof user?.password);
      if (user && user.password === password) {
        navigate("/userProfile", { state: { user } });
        console.log(`Login successful`);
      } else {
        console.log(`Invalid credentials`);
      }
    } catch (err) {
      console.log(`Error in Login: ${err}`);
    }
  };
  return (
    <div className={styles.loginDiv}>
      <h1 className={styles.loginDiv_heading}>Login</h1>
      <form action="#" onSubmit={handleClick} className={styles.loginDiv_form}>
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
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
        <button type="submit" className={styles.loginDiv_form_button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
