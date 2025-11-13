import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import PlantList from "./PlantList";



function App(){
const [plants, setPlants] = useState([]); 


useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then((r) => r.json())
  .then((data) => setPlants(data));

  }, []);
  function handleAddPlant(newPlant) {

}
  return (
    <div className="app">
      <Header />
      <PlantPage onAddPlant={handleAddPlant} />
      {/* { <PlantList plants={filteredPlants} /> } */}
      <PlantList plants={plants} />
     
    </div>
  );
}

export default App;





