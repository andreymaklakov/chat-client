import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../socket";
import { getError, joinRoom } from "../../store/chat";

import styles from "./JoinBlock.module.scss";

const JoinBlock = () => {
  const [inputValue, setInputValue] = useState({
    roomId: "",
    userName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const error = useSelector(getError());

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, [inputValue.password, inputValue.userName, inputValue.roomId]);

  const handleChange = ({ target }) => {
    setInputValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    dispatch(joinRoom(inputValue));
  };

  return (
    <div className={styles.join_block}>
      <form onSubmit={handleSubmit}>
        <input
          name="roomId"
          type="text"
          placeholder="Room ID"
          value={inputValue.roomId}
          onChange={handleChange}
          required
        />
        <input
          name="userName"
          type="text"
          placeholder="Your name"
          value={inputValue.userName}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={inputValue.password}
          onChange={handleChange}
          required
        />

        {error && <p>{error}</p>}

        <button
          disabled={
            !inputValue.roomId ||
            !inputValue.userName ||
            !inputValue.password ||
            isLoading
          }
          className="btn btn-success"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default JoinBlock;
