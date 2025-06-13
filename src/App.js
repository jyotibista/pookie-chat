import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { useEffect, useRef } from "react";

function App() {
  const [user] = useAuthState(auth);
  const bubbleContainerRef = useRef(null);

  useEffect(() => {
    const bubbleContainer = bubbleContainerRef.current;

    const createBubble = () => {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      bubble.style.animationDuration = 5 + Math.random() * 10 + "s";
      const size = 30 + Math.random() * 40;
      bubble.style.width = bubble.style.height = `${size}px`;
      bubble.style.left = Math.random() * (window.innerWidth - size) + "px";
      bubbleContainer.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 15000);
    };

    const interval = setInterval(createBubble, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App" id="App">
      <div className="bubble-container" ref={bubbleContainerRef}></div>
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
          <ChatBox />
        </>
      )}
    </div>
  );
}

export default App;
