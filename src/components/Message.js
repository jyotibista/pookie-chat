import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const [dateTime, setDateTime] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updateText, setUpdatedText] = useState(message.text);

  useEffect(() => {
    const ts = (message && message?.createdAt) || null;
    const d = new Date(ts?.seconds * 1000 + ts?.nanoseconds / 1e6);

    const pad = (n) => n.toString().padStart(2, "0");
    const h = d.getHours();
    const formatted =
      `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
      `${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${h >= 12 ? "PM" : "AM"}`;
    setDateTime(formatted);
  }, []);

  const handleDeleteMessage = async () => {
    try {
      await deleteDoc(doc(db, "messages", message.id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleUpdateMessage = async () => {
    try {
      const messageRef = doc(db, "messages", message.id);
      await updateDoc(messageRef, {
        text: updateText,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : "left"}`}
    >
      <img className="avatar" src={message.avatar} alt="avatar" />
      <div className="chat-content">
        <div className="chat-header">
          <span className="user-name">{message.name}</span>
          <span className="user-time">{dateTime}</span>
          {message.uid === user.uid && (
            <div className="action-icons">
              {!editMode ? (
                <>
                  <i
                    className="fas fa-pen"
                    onClick={() => setEditMode(true)}
                    title="Edit"
                  ></i>
                  <i
                    className="fas fa-trash"
                    onClick={handleDeleteMessage}
                    title="Delete"
                  ></i>
                </>
              ) : (
                <>
                  <i
                    className="fas fa-check"
                    onClick={handleUpdateMessage}
                    title="Save"
                  ></i>
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      setEditMode(false);
                      setUpdatedText(message.text);
                    }}
                    title="Cancel"
                  ></i>
                </>
              )}
            </div>
          )}
        </div>
        {editMode ? (
          <input
            type="text"
            className="edit-input"
            value={updateText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        ) : (
          <p className="user-message">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
