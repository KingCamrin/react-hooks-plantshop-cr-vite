import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ onAddPlant, search, setSearch, plants, onToggleSoldOut }) {
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={plants} onToggleSoldOut={onToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
