import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, photoUrl }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, photoUrl },
      ]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl, // ⭐ IMPORTANT
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto my-6 h-[80vh] flex flex-col border border-gray-700 bg-[#1e1f24] rounded-xl shadow-lg">
      <h1 className="p-5 border-b border-gray-700 bg-[#25262c] rounded-t-xl text-xl font-semibold text-gray-100">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {messages.map((msg, index) => {
          const isOwn = msg.firstName === user.firstName;

          return (
            <div
              key={index}
              className={`flex items-end gap-3 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwn &&
                (msg.photoUrl ? (
                  <img
                    src={msg.photoUrl}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="dp"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-700" />
                ))}

              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm sm:text-base shadow ${
                  isOwn
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <div className="text-xs mb-1 opacity-70">
                  {msg.firstName} {msg.lastName}
                </div>
                {msg.text}
              </div>

              {isOwn &&
                (msg.photoUrl ? (
                  <img
                    src={msg.photoUrl}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="dp"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-700" />
                ))}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-700 bg-[#25262c] rounded-b-xl flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 border border-gray-600 text-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />

        <button
          onClick={sendMessage}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:from-pink-400 hover:to-orange-300 transition-all duration-200 shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
