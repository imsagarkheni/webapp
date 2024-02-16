import React, { useState } from 'react';
import List from './List';
import RightBar from './RightBar';


const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          {/* Left Sidebar */}
          <div className="border-r border-gray-300 lg:col-span-1">
            <div className="mx-3 my-3">
              <div className="relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-300"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                  name="search"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
            <List onUserClick={handleUserClick}/>
          </div>

          {/* Right Sidebar */}
          {selectedUser ? (
            <RightBar selectedUser={selectedUser} />
          ) : (
            <div>
              <div className="hidden lg:col-span-2 lg:block">
                <div className="w-full">No Chat Open</div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Chat;
