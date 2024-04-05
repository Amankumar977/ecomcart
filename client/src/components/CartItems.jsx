import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeQuantity, removeToCart } from "../store/reducers/cart";
const CartItems = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleIncrementQty = (item) => {
    console.log(item.quantity);
    if (item.quantity === item.stock) {
      toast.error(`OOPS! We've only ${item.stock} quantity available.`);
    } else {
      const itemtoBeSent = { productId: item._id, changeBy: 1 };
      dispatch(changeQuantity(itemtoBeSent));
    }
  };

  const handleDecrementQty = (item) => {
    if (item.quantity > 1) {
      const itemtoBeSent = { productId: item._id, changeBy: -1 };
      dispatch(changeQuantity(itemtoBeSent));
    }
  };
  let hnadleRemoveFromCart = (id) => {
    let productId = id;
    dispatch(removeToCart(productId));
  };

  return (
    <div className="w-[70%] mx-auto mt-4 flex justify-between ">
      <div className="w-3/4">
        {cart &&
          cart.length > 0 &&
          cart.map((item) => (
            <div
              key={item._id}
              className="border px-2 my-4 py-2 rounded-md border-r-gray-300">
              <div className="flex gap-8">
                <div>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 my-4"
                  />
                  <div className="flex gap-3">
                    <div
                      className="bg-blue-400 text-white px-3 rounded-md cursor-pointer"
                      onClick={() => handleDecrementQty(item)}>
                      -
                    </div>
                    <div>{item.quantity}</div>
                    <div
                      className="bg-blue-400 text-white px-3 rounded-md cursor-pointer"
                      onClick={() => handleIncrementQty(item)}>
                      +
                    </div>
                  </div>
                </div>
                <div className=" w-full px-1 py-2 ">
                  <div className="font-bold">{item.name}</div>
                  <div className="flex gap-4">
                    <div className="line-through"> ₹ {item.originalPrice}</div>
                    <div>₹ {item.discountedPrice}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-blue-300 inline-block px-2 py-2 mt-2 rounded-md text-white">
                      Save for later
                    </div>
                    <div
                      className="bg-blue-300 inline-block px-2 py-2 mt-2 rounded-md text-white cursor-pointer"
                      onClick={() => hnadleRemoveFromCart(item._id)}>
                      Remove item
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-[30%]">
        <FinalAmount cart={cart} />
      </div>
    </div>
  );
};
let FinalAmount = ({ cart }) => {
  const originalPaymentPrice = cart.reduce(
    (total, item) => item.originalPrice * item.quantity + total,
    0
  );
  const finalPaymentPrice = cart.reduce((total, item) => {
    return total + item.quantity * item.discountedPrice;
  }, 0);
  const finalDiscountGiven = cart.reduce((total, item) => {
    return total + item.quantity * (item.originalPrice - item.discountedPrice);
  }, 0);
  return (
    <div className="mt-4 mx-3 border border-black py-3 px-2 space-y-3 rounded-lg w-full">
      <div>Price Details</div>
      <div className="mt-1">
        <div className="flex justify-between">
          <div>Price ({cart.length} quantity)</div>
          <div>₹{originalPaymentPrice}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>Discount </div>
        <div className="text-green-400">-₹{finalDiscountGiven}</div>
      </div>
      <div className="flex justify-between">
        <div>Delivery </div>
        <div>
          {finalPaymentPrice > 500 ? (
            <div className="flex gap-2">
              <div className="line-through">₹80</div>
              <div className="text-green-400">free</div>
            </div>
          ) : (
            <div>₹40</div>
          )}
        </div>
      </div>
      <hr />
      <div>
        <div className="flex justify-between">
          <div>Total Amount</div>
          <div>
            ₹
            {finalPaymentPrice > 500
              ? finalPaymentPrice + 500
              : finalPaymentPrice}
          </div>
        </div>
      </div>
      <div className="text-sm text-green-400 pt-2">
        You will save {finalDiscountGiven} on this order
      </div>
    </div>
  );
};
export default CartItems;
