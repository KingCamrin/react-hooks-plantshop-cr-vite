import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import PlantList from "./PlantList";



function App(){
const [plants, setPlants] = useState([]); 
const [search, setSearch] = useState("");

const filteredPlants = plants.filter((plant) => 
plant.name && plant.name.toLowerCase().includes(search.toLowerCase()) 
);

useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then((r) => r.json())
    .then((data) => {
      // Initialize soldOut property for plants that don't have it
      const plantsWithSoldOut = data.map(plant => ({
        ...plant,
        soldOut: plant.soldOut || false
      }));
      setPlants(plantsWithSoldOut);
    });
  }, []);
  
  function handleAddPlant(newPlant) {
fetch('http://localhost:6001/plants', {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(newPlant)
})
  .then(r => r.json())
  .then(returnedPlant => {
    setPlants([...plants, returnedPlant])
  });
}

function handleToggleSoldOut(id) {
  // 1️⃣ Find the plant to update
  const plantToUpdate = plants.find((plant) => plant.id === id);
  
  if (!plantToUpdate) return;

  // 2️⃣ Flip soldOut
  const updatedPlant = {
    ...plantToUpdate,
    soldOut: !plantToUpdate.soldOut,
  };

  // 3️⃣ Update state optimistically
  const updatedPlants = plants.map((plant) =>
    plant.id === id ? updatedPlant : plant
  );
  setPlants(updatedPlants);

  // 4️⃣ Send PATCH to backend (for production, but tests might not need this)
  fetch(`http://localhost:6001/plants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ soldOut: updatedPlant.soldOut }),
  })
    .then((r) => r.json())
    .then((returnedPlant) => {
      // Update with server response if different
      setPlants(prevPlants => prevPlants.map((plant) =>
        plant.id === id ? { ...plant, ...returnedPlant } : plant
      ));
    })
    .catch((error) => {
      console.error('Failed to update plant:', error);
      // In a real app, you might want to revert the optimistic update
    });
}









  return (
    <div className="app">
      <Header />
      <PlantPage 
        onAddPlant={handleAddPlant} 
        search={search}
        setSearch={setSearch}
        plants={filteredPlants}
        onToggleSoldOut={handleToggleSoldOut}
      />
    </div>
  );

}

export default App;






