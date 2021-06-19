import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import "./SingleAnimal.css";

// sida med innehåll: mer information om djuret, mata-knapp

interface IParams {
  id: string;
}

export const SingleAnimal = () => {
  let { id } = useParams<IParams>();

  let defaultValue: Animal = {
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    shortDescription: "",
    longDescription: "",
    imageUrl: "",
    medicine: "",
    isFed: false,
    lastFed: new Date(),
  };
  const [animal, setAnimal] = useState(defaultValue);

  useEffect(() => {
    let storage: Animal[] = JSON.parse(localStorage.getItem("animals") || "{}");

    // Djur blir hungrigt igen efter 3h
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === parseInt(id)) {
          let currentDate = new Date();
          let updateLastFed = new Date(storage[i].lastFed);
          let diffMilli = currentDate.getTime() - updateLastFed.getTime();
          let diffHour = Math.floor((diffMilli / (1000 * 60 * 60)) % 24);
  
          if (diffHour >= 3) {
            storage[i].isFed = false;
            localStorage.setItem("animals", JSON.stringify(storage));
          }
  
          setAnimal(storage[i]);
        }
      }
    }, [id]);

  let date = new Date(animal.lastFed).toLocaleString();

  function feed() {
    let animals: Animal[] = JSON.parse(localStorage.getItem("animals") || "{}");

    for (let i = 0; i < animals.length; i++) {
      if (animals[i].id === parseInt(id)) {
        animals[i].isFed = true;
        animals[i].lastFed = new Date();
        localStorage.setItem("animals", JSON.stringify(animals));
        setAnimal(animals[i]);
      }
    }
  }

  return (
    <section className="single-container">
      <Link to={"/"} className="goback-btn">
        {" "}
        &larr; Gå tillbaka
      </Link>
      <h1>{animal.name}</h1>
      <div className="single-card">
        <img src={animal.imageUrl} alt="" className="img-of-animal" />
        <p>Art: {animal.latinName}</p>
        <p>Född: {animal.yearOfBirth}</p>
        <p>Medicin: {animal.medicine}</p>
        <div>
          <p>Om {animal.latinName}</p>
          <p>Fått mat: {animal.isFed.toString()}</p>
          <div className="description">
            <p>{animal.longDescription}</p>
          </div>

          
          <div className="feed-animal">
            <p>
              {animal.name} matades senast kl: {date}
            </p>
            

           <div key={animal.id}> {animal.isFed ? (
          <></>
        ) : (
          <button
              onClick={() => {
                feed();
              }}
            >
              Mata {animal.name}!
            </button>
        )}
            </div>
        

            
          </div>
        </div>
      </div>
    </section>
  );
};
