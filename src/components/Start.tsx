import React, { useEffect, useState } from "react";

import axios from "axios";
import { Animal } from "../models/Animal"
import { Link } from "react-router-dom";
import "./Start.css";

export const Animals = () => {
  let defaultValue: Animal[] = [];
  const [animals, setAnimals] = useState(defaultValue);

  useEffect(() => {
    const animals = localStorage.getItem("animals");
    if (animals) {
      setAnimals(JSON.parse(animals));
    } else {
      axios
        .get<Animal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
          window.localStorage.setItem("animals", JSON.stringify(response.data));
        });
    }
  }, []);

  for (let i = 0; i < animals.length; i++) {
    let currentDate = new Date();
    let updateLastFed = new Date(animals[i].lastFed);
    let diffMilli = currentDate.getTime() - updateLastFed.getTime();
    let diffHour = Math.floor((diffMilli / (1000 * 60 * 60)) % 24);

    if (diffHour >= 10000) {
      animals[i].isFed = false;
      localStorage.setItem("animals", JSON.stringify(animals));
    }
  }

  let lis = animals.map((animal) => {
    return (
      <li key={animal.id} className="animal">
        <Link to={`/animal/${animal.id}`}><span className="names">{animal.name}  </span></Link>
        {animal.isFed ? (
          <></>
        ) : (
          <span className="hungry">HUNGRIG</span>
        )}<br></br>
        {animal.shortDescription}
      </li>
    );
  });

  return (
    <section className="container">
      <h1>Zoo nice to meet you!</h1>
      <div className="card">
      <div className="presentation-container">
        
        <p className="zoo-pres">
          Vi har mkt söta djur. Läs mer om våra söta djur <br></br>och framförallt: ta med mat!! (nedskärningar:/) 
        </p>
        <div className="animals-container">
          <ul className="animals">{lis}</ul>
        </div>
      </div>
      </div>
    </section>
  );
};

