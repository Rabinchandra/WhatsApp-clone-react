import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";

function Room({ id, name, avatarUrl, setRoomId, setCurrentRoomName }) {
  const [lastMessage, setLastMessage] = useState("");

  const clickHandler = () => {
    setRoomId(id);
    setCurrentRoomName(name);
  };

  // Get messages and set the last message
  useEffect(() => {
    db.collection("room")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snap) => {
          // Get the last message
          if (snap.docs.length) {
            setLastMessage(snap.docs[0].data().message);
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }, [id]);

  return (
    <Link to={`/chat/${id}`} className="room" onClick={clickHandler}>
      <Avatar src={avatarUrl} id="room__avatar" />
      <section className="room__details">
        <strong>{name}</strong>
        <small>{lastMessage}</small>
      </section>
    </Link>
  );
}

export default Room;
