import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();

  // Logged-in user (may be null initially)
  const user = useSelector((store) => store.user);

  // All connections
  const connections = useSelector((store) => store.connections);

  // Find the friend we’re chatting with
  const targetUser = connections?.find((c) => c._id === targetUserId) || null;

  // Sample messages (replace with real data later)
  const [messages, setMessages] = useState([
    targetUser && {
      firstName: targetUser.firstName,
      lastName: targetUser.lastName,
      photoUrl: targetUser.photoUrl,
      text: "Hey there! How are you?",
    },
    user && {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      text: "I’m good! What about you?",
    },
  ].filter(Boolean)); // filter out null if user or targetUser is missing

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;
    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        text: newMessage,
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto my-6 h-[80vh] flex flex-col border border-gray-600 bg-[#1e1f24] rounded-xl shadow-md">
      {/* ===== Header with DP ===== */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-600 bg-[#25262c] rounded-t-xl">
        {targetUser?.photoUrl ? (
          <img
            src={targetUser.photoUrl}
            alt="user"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-500/40"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700" />
        )}

        <h1 className="text-lg sm:text-xl font-bold text-gray-100">
          {targetUser
            ? `${targetUser.firstName} ${targetUser.lastName}`
            : "Chat"}
        </h1>
      </div>

      {/* ===== Messages ===== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg, index) => {
          const isOwn = msg.firstName === user?.firstName; // ✅ safe check
          return (
            <div
              key={index}
              className={`flex items-end gap-3 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwn && (
                <img
                  src={msg.photoUrl}
                  alt="dp"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              <div
                className={`max-w-[70%] p-3 rounded-xl text-sm sm:text-base ${
                  isOwn
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {msg.text}
              </div>

              {isOwn && (
                <img
                  src={msg.photoUrl}
                  alt="dp"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ===== Input ===== */}
      <div className="p-4 border-t border-gray-600 flex items-center gap-3 bg-[#25262c] rounded-b-xl">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-500 bg-gray-800 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleSend}
          disabled={!user}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:from-pink-400 hover:to-orange-300 transition-all duration-200 shadow-md disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
