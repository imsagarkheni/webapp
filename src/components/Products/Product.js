import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductDetail } from "./productSlice";
import Modal from "../../common/Modals/Modal";
import event from "../../assets/images/credit-card.png";
import AddProduct from "../Popup/AddProduct";
import { ProgressSpinner } from "primereact/progressspinner";
import { Link } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const [addProduct, setAddProduct] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(4);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const productList = async (page, searchQuery = "") => {
    try {
      setIsLoading(true);
      const payload = {
        page,
        limit,
        search: searchQuery,
      };
      const response = await dispatch(getProductDetail(payload)).unwrap();
      setData(response.data.Data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productList(currentPage, search);
  }, [currentPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

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

  const pageNumbers = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pageNumbers.push(i);
  }

  // Pagination handlers
  const changePage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const Star = ({ star }) => {
    const numberRating = Number(star);
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
      let number = index + 0.5;
      return (
        <span key={index}>
          {numberRating >= index + 1 ? (
            <i className="fa-solid fa-star"></i>
          ) : numberRating >= number ? (
            <i className="fa-regular fa-star-half-stroke"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </span>
      );
    });
    return <div>{ratingStar}</div>;
  };

  return (
    <div>
      <div className="sticky top-0 flex justify-between py-2 px-3 z-10">
        <div className="flex justify-between items-center">
        <Link to={'/dashboard'}><i className="fa-solid fa-arrow-left fa-2xl"></i></Link>
        <h2 className="ml-5 block font-bold leading-[48px] text-[#111827]">
          Products
        </h2>
        </div>
        <button
          className="btn btn-primary text-[#fff]"
          onClick={() => setAddProduct(true)}
        >
          Add Product
        </button>
      </div>
      <div className="sticky bottom-0 mx-3 my-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-2">
        {isLoading ? (
          <div className="flex justify-center mt-4">
            <div className="flex items-center">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
          </div>
        ) : (
          data.docs?.map((product) => (
            <div
              key={product._id}
              className="group flex flex-col overflow-hidden bg-white rounded-lg shadow-md"
            >
              <a
                href="#"
                className="relative flex h-80 w-72 overflow-hidden group-hover:opacity-80"
              >
                <img
                  className="absolute top-0 right-0 h-full w-full object-cover"
                  src={product.image}
                  alt="product image"
                />
    
                <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                <button className="flex h-10 w-10 font-extralight items-center justify-center bg-red-600 text-white transition hover:bg-red-400">
                  20% Off 
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                  <i class="fa-solid fa-heart"></i>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                  <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </a>
              <div className="mt-4 pb-5">
                <a href="#">
                  <h5 className="text-center tracking-tight text-gray-500">
                    {product.title}
                  </h5>
                </a>
                <div className="mb-5 flex justify-center">
                  <p>
                    <span className="text-sm font-bold text-gray-900">
                      <Star star={product.ratings} />
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-sm ml-1 text-gray-400 line-through">
                     $2099
                    </span>
                  </p>
                </div>
                <div className="mb-5 flex justify-center">
                <Link
                  to={`/productdetails/${product._id}/${encodeURIComponent(JSON.stringify(product))}`}>
                      <button className="glow-on-hover">See Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="sticky bottom-0 flex justify-center mt-4">
        <button
          onClick={prevPage}
          className="btn btn-primary text-[#fff] mr-2"
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
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="btn btn-primary text-[#fff]"
          disabled={currentPage === data.totalPages}
        >
          Next
        </button>
      </div>
      <Modal isOpen={addProduct}>
        <AddProduct handleClose={() => setAddProduct(false)} />
      </Modal>
    </div>
  );
};

export default Product;
