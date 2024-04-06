import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  return (
    <div className="w-11/12 mx-auto py-5">
      {data && (
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img
              src={data.images.length > select && data.images[select]}
              alt={data.title}
              className="w-[500px]"
            />
            <div className="flex mt-3">
              {data.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer mr-2 ${
                    select === index && "border border-gray-500"
                  }`}>
                  <img
                    src={image}
                    alt=""
                    className="h-16"
                    onClick={() => setSelect(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-5">
            <h1 className="text-xl font-bold text-gray-800">{data.name}</h1>
            <p className="mt-3 text-gray-600">{data.description}</p>
            <div className="flex mt-3">
              <h4 className="font-bold text-lg text-gray-800">
                &#8377; {data.discountedPrice}
              </h4>
              {data.originalPrice && (
                <h3 className="ml-3">&#8377; {data.originalPrice}</h3>
              )}
            </div>
            <div className="flex items-center mt-4">
              <button
                disabled={count === 1}
                onClick={() => setCount(count - 1)}
                className="bg-teal-500 text-white px-3 py-1 rounded-l hover:bg-teal-600">
                -
              </button>
              <span className="bg-gray-200 text-gray-800 px-3 py-1">
                {count}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                className="bg-teal-500 text-white px-3 py-1 rounded-r hover:bg-teal-600">
                +
              </button>
            </div>
            <div className="flex items-center mt-4">
              {click ? (
                <AiFillHeart
                  size={22}
                  className="cursor-pointer text-red-500"
                  // onClick={handleRemoveFromWishList}
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className="cursor-pointer text-gray-800"
                  // onClick={handleAddToWishList}
                />
              )}
            </div>
            <div className="mt-4 flex items-center">
              <Link className="flex items-center">
                <img
                  src={
                    "https://imgs.search.brave.com/UN1J8sqLQjmE3-Yk4A9gRYlkGIHiZMGsEV_fvh-_fso/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0cv/MDEvQWRQcm9kdWN0/c1dlYnNpdGUvaW1h/Z2VzL0FVWC8wMl9h/bWF6b25fbG9nb19S/R0JfU1FVSUQuX1RU/V18ucG5n"
                  }
                  alt={data.title}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <div>
                  <h3 className="text-blue-400">Amazon</h3>
                  <h5 className="font-bold">4.5 / 5.0 Ratings</h5>
                </div>
              </Link>
              <button
                // onClick={handleMessageSubmit}
                className="ml-auto bg-black text-white px-5 py-2 rounded-lg flex items-center">
                Send Message <AiOutlineMessage className="ml-1" />
              </button>
              <h5 className="ml-4 text-red-600">
                ({data.sold_out}) items Sold
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="container mx-auto py-5">
      <div className="flex border-b pb-2">
        <div
          className={`cursor-pointer mr-4 ${
            active === 1 && "border-b-2 border-black"
          }`}
          onClick={() => setActive(1)}>
          <h5 className="text-sm font-semibold">Product details</h5>
        </div>
        <div
          className={`cursor-pointer mr-4 ${
            active === 2 && "border-b-2 border-black"
          }`}
          onClick={() => setActive(2)}>
          <h5 className="text-sm font-semibold">Product Reviews</h5>
        </div>
        <div
          className={`cursor-pointer ${
            active === 3 && "border-b-2 border-black"
          }`}
          onClick={() => setActive(3)}>
          <h5 className="text-sm font-semibold">Seller Information</h5>
        </div>
      </div>
      {active === 1 && (
        <div className="mt-4">
          <p className="text-base text-gray-700">{data.description}</p>
        </div>
      )}
      {active === 2 && (
        <div className="mt-4">
          {data.reviews.map((review, index) => (
            <div key={index} className="flex items-center mt-4">
              <img
                src={review.customerAvatar}
                alt={review.customerName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg">{review.review}</p>
                <div className="flex items-center">
                  {renderStars(data.ratings[index])}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
