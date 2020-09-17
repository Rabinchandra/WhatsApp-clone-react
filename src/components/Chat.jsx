import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import KeyboardVoiceOutlinedIcon from "@material-ui/icons/KeyboardVoiceOutlined";
import { db, timestamp } from "../firebase/config";

function Chat({ user, roomId, currentRoomName }) {
  const [messages, setMessages] = useState([]);
  const seed = parseInt(Math.random() * 100);

  // Send message
  const formSubmit = (e) => {
    e.preventDefault();
    const input = e.target.firstElementChild;
    db.collection("room")
      .doc(roomId)
      .collection("messages")
      .add({
        userName: user.displayName,
        timestamp: timestamp(),
        message: input.value,
      })
      .catch((err) => {
        console.log(err.message);
      });
    // Clear input
    input.value = "";
  };

  // Get the messages
  useEffect(() => {
    if (roomId) {
      db.collection("room")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => {
          const documents = [];
          snap.docs.forEach((doc) => {
            documents.push(doc.data());
          });
          setMessages(documents);
        });
    }
  }, [roomId]);

  return (
    <div className="chat">
      <section className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header__details">
          {currentRoomName}
          <small className="last__seen">
            {messages.length
              ? "last seen at " +
                messages[messages.length - 1].timestamp?.toDate().toUTCString()
              : ""}
          </small>
        </div>
        <div className="chat-header__buttons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon id="attach-file__icon" />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </section>

      <section className="chat-text__container">
        {messages.map((m, index) =>
          m.userName === user.displayName ? (
            <div className="msg__text receiver__text" key={index}>
              <span className="text">{m.message}</span>
              <small className="timestamp">
                {m.timestamp?.toDate().toUTCString()}
              </small>
            </div>
          ) : (
            <div className="msg__text sender__text" key={index}>
              <small className="userName">{m.userName}</small>
              <span className="text">{m.message}</span>
              <small className="timestamp">
                {m.timestamp.toDate().toUTCString()}
              </small>
            </div>
          )
        )}
      </section>

      <section className="msg-send__box">
        <IconButton>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <form className="msg-send__form" onSubmit={formSubmit}>
          <input type="text" placeholder="Type a message" />
        </form>
        <IconButton>
          <KeyboardVoiceOutlinedIcon />
        </IconButton>
      </section>
    </div>
  );
}

export default Chat;
