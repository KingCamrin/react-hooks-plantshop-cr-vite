import React from "react";

function PlantCard({plant, onToggleSoldOut}) {
  return (
    <li className="card" data-testid="plant-item">
      <img src="{plant.image}" alt={"plant.name"} />
      <h4>{"plant.name"}</h4>
      <p>Price: {"plant price"}</p>
      {plant.soldOut ? (
        <button className="primary">In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;

