import React, { useEffect, useState } from "react";
import "./Maincontent.css";
import Post from "./Post.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.css"; // Import custom CSS file for styling
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SettingsPopup from "./SettingsPopup";

export default function Maincontent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleItemClick = () => {
    setIsSettingsOpen(false);
  };
  const handleItemClickSetting = () => {
    setIsSettingsOpen(true);
  };

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  // from backend
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the latest 5 questions from the backend API
    fetchLatestQuestions();
  }, []);

  const fetchLatestQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/questionRoute/latest-questions`
      );
      if (response.ok) {
        const questions = await response.json();
        setPosts(questions);
      } else {
        console.error("Error fetching latest questions:", response.status);
      }
    } catch (error) {
      console.error("Error fetching latest questions:", error);
    }
  };

  // write post

  const [content, setContent] = useState("");
  const [tag, setTag] = useState("TAG");
  const [user, setUserid] = useState({}); // Initialize to null

  useEffect(() => {
    // Check if the token exists in the local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to get the payload
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Extract the userid from the payload
        const user = {userid:payload._id, username:payload.username, email: payload.email};
        setUserid(user);
        console.log(payload);
        
        console.log("User ID:", user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
    // console.log(value);
  };

  const handleQuestion = async (event) => {
    event.preventDefault();

    try {
      if (!user.userid) {
        console.error("Invalid userid");
        return;
      }

      const questionData = {  userName:user.username, email: user.email, content, tag };
      console.log("Question data: ",questionData);
      const response = await fetch(
        `http://localhost:3001/api/questionRoute/addque/${user.userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        }
      );

      if (response.ok) {
        const question = await response.json();
        console.log("Question posted successfully:", question);
        showSuccessMessage();
        setContent("");
        setTag("Tag");
      } else {
        console.error("Error posting the question:", response.status);
      }
    } catch (error) {
      console.error("Error posting the question:", error);
    }

    fetchLatestQuestions();
  };

  const showSuccessMessage = () => {
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";

    // Hide the message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };
  // removed strike and clean option
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
  ];

  // return 
  return (
    <>
    <Navbar />
    <div className="the-total-page">
    <Sidebar handleItemClick={handleItemClick} handleItemClickSetting={handleItemClickSetting} /> 
    <div className="maincontent">
      
      <div className="write-container">
        <div className="quora-header">
          <span className="quora-ask-question">Ask a Question</span>
          <button className="quora-submit-btn" onClick={handleQuestion}>
            +
          </button>
        </div>
        <div
          id="success-message"
          className="alert alert-success"
          role="alert"
          style={{ display: "none" }}
        >
          Question added successfully!
        </div>
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder="Ask a question..."
          className="quora-editor"
        />
      </div>


      {posts.map((post) => (
        <Post
          key={post._id}
          content={post.content}
          username={post.userName}
          votes={post.votes}
          email={post.email}
        />
        
      ))}
    </div>
    </div>
    {isSettingsOpen && <SettingsPopup handleClose={handleClose} />}
    </>
  );
}
