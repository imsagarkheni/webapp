import React, { useState, useEffect } from "react";
import { getUserList } from "./userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";

function Users({ handleClose }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
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
      setData([]);
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error("Failed to fetch user list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userList(currentPage, search);
  }, [currentPage, search]);

  const nextPage = () => {
    if (currentPage < data.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const pageNumbers = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pageNumbers.push(i);
  }

  const changePage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50">
      <div className="max-w-[600px] h-[500px] w-full m-auto bg-white rounded-3xl shadow-shadowbox p-8 flex flex-col">
        <div className="sticky top-0 flex justify-between items-center mb-2">
          <h3 className="text-center text-[#111827]">Users</h3>
          <button onClick={() => handleClose(false)} className="btn btn-primary text-[#fff] text-sm">
          <i class="fa-solid fa-xmark fa-xl"></i>
          </button>
        </div>
        <div className="sticky top-12">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center mt-4">
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </div>
          ) : (
            <div>
              {data.docs?.map((ele, index) => (
                <div
                  key={ele._id}
                  className="space-y-4 flex justify-between items-center"
                >
                  <div className="w-full text-base py-2 px-1 rounded bg-slate-300 my-1">
                    <span className="font-normal pl-2">
                      {" "}
                      {(currentPage - 1) * limit + index + 1}
                    </span>{" "}
                    - {ele.firstName} {ele.lastName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0">
          <div className="flex justify-center">
            <button
              onClick={prevPage}
              className="btn btn-primary text-[#fff] mr-2 text-sm"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`btn btn-primary text-[#fff] mr-2 ${
                  currentPage === page ? "bg-[#93abe3] text-white" : ""
                } text-sm`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={nextPage}
              className="btn btn-primary text-[#fff] text-sm"
              disabled={currentPage === data.totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Users;
