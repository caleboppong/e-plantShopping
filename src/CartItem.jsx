import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      return total + itemCost * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    return (itemCost * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalAmount = calculateTotalAmount().toFixed(2);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${totalAmount}</h2>
      <h3>Total Items in Cart: {totalCartItems}</h3>

      <div className="cart-buttons">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item-card">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <h3>{item.name}</h3>
              <p>Unit Price: {item.cost}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${calculateTotalCost(item)}</p>

              <div className="cart-item-actions">
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
                <button onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartItem;