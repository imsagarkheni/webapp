import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addCartDetails } from "../Cart/cartSlice";

const ProductDetails = () => {
  const { _id, productData } = useParams();
  const parsedProductData = JSON.parse(decodeURIComponent(productData));

  const dispatch = useDispatch();
  const initalState = {
    productData :parsedProductData,
    quantity:5
  }

  const handleSubmit = async () => {
      try {
          let payload = Object.assign({}, initalState);
          console.log("ffff",payload);
          let response = await dispatch(addCartDetails(payload)).unwrap();
          if (response.data.IsSuccess) {
            toast.success(response.data.Message);
          } else {
            toast.error(response.data.Message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong.");
        }
}
  return (
    <div>
      <div className="sticky top-0 flex justify-between py-2 px-3 z-10">
        <div className="flex justify-between items-center">
          <Link to={"/products"}>
            <i className="fa-solid fa-arrow-left fa-2xl"></i>
          </Link>
          <h2 className="ml-5 block font-bold leading-[48px] text-[#111827]">
            Products
          </h2>
        </div>
      </div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={parsedProductData.image}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button onClick={handleSubmit} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">
                {parsedProductData.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {parsedProductData.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-gray-600">
                    $ {parsedProductData.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Availability:</span>
                  <span className="text-gray-600">In Stock</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Select Color:</span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700">
                  Product Description:
                </span>
                <p className="text-gray-600 text-sm mt-2">
                  {parsedProductData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
