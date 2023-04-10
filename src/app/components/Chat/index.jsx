import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import {
  getMessages,
  getRoom,
  getUserName,
  getUsers,
  sendMessage,
} from "../../store/chat";

import styles from "./Chat.module.scss";
import { useOutside } from "../../hooks/useOutside";

const Chat = () => {
  const [message, setMessage] = useState("");
  // const [emoOpen, setEmoOpen] = useState(false);

  const { ref, isShown, setIsShown } = useOutside();

  const users = useSelector(getUsers());
  const messages = useSelector(getMessages());
  const userName = useSelector(getUserName());
  const room = useSelector(getRoom());

  const dispatch = useDispatch();

  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendMessage(message));

    setMessage("");
  };

  const handleEmojiClick = ({ emoji }) => {
    setMessage((prevState) => `${prevState}${emoji}`);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chat_users}>
        <b>Room: {room}</b>
        <hr />
        <b>Online ({users.length})</b>

        <ul>
          {users.length ? users.map((user, i) => <li key={i}>{user}</li>) : ""}
        </ul>
      </div>

      <div className={styles.chat_messages_container}>
        <div className={styles.chat_messages} ref={messagesRef}>
          <b>Messages ({messages.length})</b>

          <div className={styles.messages}>
            {messages.length
              ? messages.map((message, i) => (
                  <div
                    key={i}
                    className={`${styles.message} ${
                      userName === message.userName ? styles.message_my : ""
                    }`}
                  >
                    <p
                      className={
                        userName === message.userName ? styles.message_my : ""
                      }
                    >
                      {message.text}
                    </p>

                    {message.userName !== userName && (
                      <div>
                        <span>{message.userName}</span>
                      </div>
                    )}
                  </div>
                ))
              : ""}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            value={message}
            rows="3"
            onChange={handleChange}
            className="form-control"
          />

          <div className={styles.form_btns}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!message}
            >
              Send
            </button>

            <MdOutlineEmojiEmotions
              onClick={() => setIsShown((prevState) => !prevState)}
            />

            {isShown && (
              <div className={styles.emojies} ref={ref}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
