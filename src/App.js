import "./App.css";
import Comment from "./components/comment/comment.js";
import data from "./data.js";
import React, { useState } from "react";
import pic from "./components/comment/photos/image-amyrobson.png";
function App() {
  const [cmt, setCmt] = useState(data.comments);
  const [user, setUser] = useState(data.currentUser);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue((prev) => {
      return e.target.value;
    });
  };
  const addComment = () => {
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
      <div className="app">
        {console.log(cmt)}
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
