import React, { useState } from "react";
import "./reply.css";
import plus from "./photos/icon-plus.svg";
import minus from "./photos/icon-minus.svg";
import reply from "./photos/icon-reply.svg";
import pic from "./photos/image-amyrobson.png";
import edit from "./photos/icon-edit.svg";
import del from "./photos/icon-delete.svg";
function Reply({
  content,
  date,
  image,
  name,
  score,
  replyingTo,
  currentUser,
  addReply,
}) {
  const [showBox, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [edit2, setEdit] = useState(false);
  const [replyEdit, setReplyEdit] = useState(content);
  const [stateContent, setContent] = useState(content);

  const showReply = () => {
    setShow((prev) => {
      return !prev;
    });
    setValue("");
  };

  const onChange = (e) => {
    setValue((prev) => {
      return e.target.value;
    });
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
    <>
      <div className="reply-cont">
        <div className="left">
          <div className="wrap">
            <img className="img-icon" src={plus} alt="2" />
            <p className="amount">{score}</p>
            <img className="img-icon" src={minus} alt="3" />
          </div>
        </div>
        <div className="right">
          <div className="right__top">
            <div className="profile reply-profile">
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
                <div className="delete">
                  <img src={del} alt="5" />
                  <p className="delete-para">Delete</p>
                </div>
                <div onClick={editHandler} className="reply">
                  <img src={edit} alt="5" />
                  <p className="reply-para">Edit</p>
                </div>
              </div>
            )}
          </div>
          <div className="right__bottom">
            {!edit2 ? (
              <p className="main-cmt">
                <strong className="tag">{`@${replyingTo} `}</strong>
                {stateContent}
              </p>
            ) : (
              <div className="edit-div">
                <textarea
                  value={replyEdit}
                  onChange={onChange2}
                  className="edit-text"
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
        className="add-reply small"
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
            addReply(value, name, currentUser);
            showReply();
          }}
          className="send"
        >
          REPLY
        </button>
      </div>
    </>
  );
}

export default Reply;
