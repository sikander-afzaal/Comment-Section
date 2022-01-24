import React, { useState } from "react";
import "./comment.css";
import plus from "./photos/icon-plus.svg";
import minus from "./photos/icon-minus.svg";
import reply from "./photos/icon-reply.svg";
import edit from "./photos/icon-edit.svg";
import del from "./photos/icon-delete.svg";
import pic from "./photos/image-amyrobson.png";
import Reply from "../Reply/reply.js";
function Comment({
  index,
  content,
  date,
  image,
  name,
  score,
  replies,
  currentUser,
  openModal,
  findKey,
}) {
  const [showBox, setShow] = useState(false);
  const [allReplies, setReplies] = useState(replies);
  const [value, setValue] = useState("");
  const [edit2, setEdit] = useState(false);
  const [replyEdit, setReplyEdit] = useState(content);
  const [stateContent, setContent] = useState(content);

  const onChange = (e) => {
    setValue((prev) => {
      return e.target.value;
    });
  };

  const showReply = () => {
    setShow((prev) => {
      return !prev;
    });
  };
  const addReply = (
    content = value,
    replyingTo = name,
    username = currentUser
  ) => {
    const replyObj = {
      id: 3,
      content: content,
      createdAt: "Just Now",
      score: 1,
      replyingTo: replyingTo,
      user: {
        image: {
          png: "./images/avatars/image-ramsesmiron.png",
          webp: "./images/avatars/image-ramsesmiron.webp",
        },
        username: username,
      },
    };
    setReplies((prev) => {
      return [...prev, replyObj];
    });
    setValue("");
  };
  const onChange2 = (e) => {
    setReplyEdit((prev) => {
      return e.target.value;
    });
  };
  const editHandler = (e) => {
    if (edit2) {
      setEdit((prev) => !prev);
      setReplyEdit(stateContent);
    } else {
      setEdit((prev) => !prev);
    }
  };
  const updateHandler = (e) => {
    setContent(replyEdit);
    setEdit((prev) => !prev);
  };
  return (
    <div className="wrapper-cmt">
      <div className="comment">
        <div className="left">
          <div className="wrap">
            <img className="img-icon" src={plus} alt="2" />
            <p className="amount">{score}</p>
            <img className="img-icon" src={minus} alt="3" />
          </div>
        </div>
        <div className="right">
          <div className="right__top">
            <div className="profile">
              <img className="profile-img" src={pic} alt="1" />
              <p className="name">{name}</p>
              <p className={`you ${currentUser === name ? "show" : ""}`}>you</p>
              <p className="date">{date}</p>
            </div>
            {name !== currentUser ? (
              <div className="reply" onClick={showReply}>
                <img src={reply} alt="5" />
                <p className="reply-para">Reply</p>
              </div>
            ) : (
              <div className="delete_edit">
                <div
                  onClick={() => {
                    openModal(true);
                    findKey(index);
                  }}
                  className="delete"
                >
                  <img src={del} alt="5" />
                  <p className="delete-para">Delete</p>
                </div>
                <div className="reply">
                  <img src={edit} alt="5" />
                  <p onClick={editHandler} className="reply-para">
                    Edit
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="right__bottom">
            {!edit2 ? (
              <p className="main-cmt">{stateContent}</p>
            ) : (
              <div className="edit-div">
                <textarea
                  value={replyEdit}
                  onChange={onChange2}
                  className="edit-text"
                  style={{ width: "100%" }}
                ></textarea>
                <button onClick={updateHandler} className="update send">
                  UPDATE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ display: `${showBox ? "flex" : "none"}` }}
        className="add-reply"
      >
        <img src={pic} alt="" />
        <textarea
          id="newReply"
          className="text"
          name="#"
          cols="30"
          rows="10"
          value={value}
          onChange={onChange}
        ></textarea>
        <button
          onClick={() => {
            showReply();
            addReply(value, name, currentUser);
          }}
          className="send"
        >
          REPLY
        </button>
      </div>
      <div className="replies">
        {allReplies.map((re, index) => {
          return (
            <Reply
              key={index}
              content={re.content}
              date={re.createdAt}
              image={re.user.image.png}
              name={re.user.username}
              score={re.score}
              replyingTo={re.replyingTo}
              currentUser={currentUser}
              addReply={addReply}
              openModal={openModal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
