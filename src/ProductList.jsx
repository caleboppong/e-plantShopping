import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plants = [
    {
      name: "Snake Plant",
      cost: "$15",
      image: "https://via.placeholder.com/150",
      category: "Air Purifying"
    },
    {
      name: "Peace Lily",
      cost: "$18",
      image: "https://via.placeholder.com/150",
      category: "Air Purifying"
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      {plants.map((plant, index) => (
        <div key={index}>
          <img src={plant.image} alt={plant.name} width="100" />
          <h3>{plant.name}</h3>
          <p>{plant.cost}</p>
          <button
            onClick={() => handleAddToCart(plant)}
            disabled={isInCart(plant.name)}
            style={{
              backgroundColor: isInCart(plant.name) ? "gray" : "",
              cursor: isInCart(plant.name) ? "not-allowed" : "pointer"
            }}
          >
            {isInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;