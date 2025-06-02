import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useData } from "../context/Context";
const baseUrl = import.meta.env.VITE_BASE_URL;
function ChatBox() {
  const socketRef = useRef();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { profileData } = useData();

  const room = profileData?.user?._id;

  // Connect to socket and join room
  useEffect(() => {
    socketRef.current = io("http://localhost:8000");
    socketRef.current.emit("join_room", room);

    socketRef.current.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [room]);

  // Fetch old messages for the room
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/messages/${room}`);
        setMessageList(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [room]);

  // Send message
  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room,
        author: profileData?.user?.name,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      socketRef.current.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[50vh] sm:h-[80vh] max-w-md mx-auto border rounded-xl overflow-hidden bg-white shadow-md mt-30">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messageList.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-2xl text-gray-800 ${
              msg.author === profileData?.user?.name
                ? "self-end bg-green-100"
                : "self-start bg-gray-200"
            }`}
          >
            <span>{msg.message}</span>
            <div className="text-xs text-right text-gray-500">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="flex items-center p-3 border-t bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
