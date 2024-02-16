import React, { useState, useEffect } from "react";
import { getUserList } from "../Friend/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";

const List = ({onUserClick}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(50);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const userList = async (page, searchQuery = "") => {
    try {
      setIsLoading(true);
      const payload = {
        page,
        limit,
        search: searchQuery,
      };
      const response = await dispatch(getUserList(payload)).unwrap();
      setData(response.data.Data);
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error("Failed to fetch user list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userList(currentPage, search);
    localStorage.setItem("openedChat", "");
  }, [currentPage, search]);

  const openChat = (id) => {
    localStorage.setItem("openedChat", id);
    onUserClick(id); // Notify the parent component about the selected user
  };
  return (
    <div>
      <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        {data.docs?.map((ele)=>
             (
                <li key={ele._id} onClick={() => openChat(ele._id)}>
          <a href="#!" className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-gray-600">
                  {ele.firstName} {ele.lastName}
                </span>
                <span className="block ml-2 text-sm text-gray-600">25 minutes</span>
              </div>
              <span className="block ml-2 text-sm text-gray-600">bye</span>
            </div>
          </a>
        </li>
            )
        )}
        
      </ul>
    </div>
  );
};

export default List;
