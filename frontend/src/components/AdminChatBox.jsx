import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function AdminChatBox() {
  const socketRef = useRef();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Fetch users to display in sidebar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user"); // Your endpoint
        setUsers(res?.data?.user);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Handle socket connection and room join
  useEffect(() => {
    if (!selectedUser) return;

    socketRef.current = io("http://localhost:8000");
    socketRef.current.emit("join_room", selectedUser._id);

    socketRef.current.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [selectedUser]);

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/messages/${selectedUser._id}`
        );
        setMessageList(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  const sendMessage = () => {
    if (currentMessage.trim() === "" || !selectedUser) return;

    const messageData = {
      room: selectedUser._id,
      author: "admin",
      message: currentMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socketRef.current.emit("send_message", messageData);
    setMessageList((prev) => [...prev, messageData]);
    setCurrentMessage("");
  };

  return (
    <div className="flex h-[80vh] mt-30">
      {/* Sidebar with user list */}
      <div className="w-1/4 border-r bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setMessageList([]); // reset messages
            }}
            className={`block w-full text-left px-4 py-2 mb-2 rounded ${
              selectedUser?._id === user._id
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {user.name}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-gray-800 ${
                msg.author === "admin"
                  ? "self-end bg-green-100"
                  : "self-start bg-gray-200"
              }`}
            >
              <span>{msg.message}</span>
              <div className="text-xs text-right text-gray-500">{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Input box */}
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
    </div>
  );
}

export default AdminChatBox;
