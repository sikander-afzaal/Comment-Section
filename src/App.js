import "./App.css";
import Comment from "./components/comment/comment.js";
import data from "./data.js";
import React, { useState } from "react";
import pic from "./components/comment/photos/image-amyrobson.png";
function App() {
  const [cmt, setCmt] = useState(data.comments);
  const [user, setUser] = useState(data.currentUser);
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [key, setKey] = useState("");
  const onChange = (e) => {
    setValue((prev) => {
      return e.target.value;
    });
  };
  const dataCollector = (key) => {
    setKey(key);
  };
  const deleteComment = (e) => {
    console.log(key);
    setCmt((prev) => {
      return prev.filter((elem, index) => {
        return index !== key;
      });
    });
  };
  const addComment = (e) => {
    e.preventDefault();
    const textArea = value;
    const comment = {
      id: 1,
      content: textArea,
      createdAt: "Just Now",
      score: 1,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
      replies: [],
    };
    setCmt((prev) => {
      return [...prev, comment];
    });
    setValue("");
  };
  return (
    <div className="wrap-app">
      <div className={`overlay ${modal ? "overlay-open" : ""}`}></div>
      <div className="app">
        <div className={`delete-modal ${modal ? "open-modal" : ""}`}>
          <h1>Delete Comment</h1>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and this can't be undone
          </p>
          <div className="modal-btn">
            <button
              onClick={() => {
                setModal(false);
              }}
              className="cancel"
            >
              NO, CANCEL
            </button>
            <button onClick={deleteComment} className="delete-btn">
              YES, DELETE
            </button>
          </div>
        </div>
        {cmt.map((comment, index) => {
          return (
            <Comment
              key={index}
              content={comment.content}
              date={comment.createdAt}
              image={comment.user.image.png}
              name={comment.user.username}
              score={comment.score}
              replies={comment.replies}
              currentUser={user.username}
              openModal={setModal}
              findKey={dataCollector}
              index={index}
            />
          );
        })}
      </div>
      <div className="add-cmt">
        <img src={pic} alt="" />
        <textarea
          className="text"
          name="#"
          id=""
          cols="30"
          rows="10"
          placeholder="Add a comment..."
          value={value}
          onChange={onChange}
        ></textarea>
        <button onClick={addComment} className="send">
          SEND
        </button>
      </div>
    </div>
  );
}

export default App;
