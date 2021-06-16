import React, { useState } from "react";
import handleHttpErrors from "./Errors";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";
import { URLDOGCRET, URLDOGDELET, makeOptions } from "./settings.js";
import { propTypes } from "react-bootstrap/esm/Image";
import "./App.css";
import App, { username } from "./App.js";

export function CreateDog() {
    var countress = 0;
    const initialValue = {
        name: "",
        breed: "",
        gender: "",
        birthDate: ""
    };

    const createOne = (e) => {
        e.preventDefault();
        const options = makeOptions("POST", true, {
            name: theDog.name,
            breed: theDog.breed,
            gender: theDog.gender,
            birthDate: theDog.birthDate,
        });
        return fetch(URLDOGCRET, options)
            .then(handleHttpErrors)
            .then(resetValues);

    };

    const resetValues = () => {
        setTheDog(initialValue);
        document.getElementById("nameID").value = "";
        document.getElementById("breedID").value = "";
        document.getElementById("genderID").value = "";
        document.getElementById("birthDateID").value = "";
        document.getElementById("dogCreatedNow").innerText =
            "You have now added a new dog to the system!";
    };
    const youDeletedADog = () => {
        document.getElementById("deleteID").value = "";
        document.getElementById("dogToDie").innerText =
            "You have now deleted a dog from the system!";
    }

    const [theDog, setTheDog] = useState(initialValue);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setTheDog({ ...theDog, [name]: value });
    };

    const removeOne = (e) => {
        e.preventDefault();
        const options = makeOptions("DELETE", true, {
            name: document.getElementById("deleteID").value,
        });
        return fetch(URLDOGDELET + "/" + document.getElementById("deleteID").value, options)
            .then(handleHttpErrors).then(youDeletedADog);

    };

    function handleSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(theDog));
        // props.transferPerson(character.name) // Trojansk callback hest
    }

    return (
        <div>
            <form>
                <input
                    id="nameID"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                />
                <br />
                <input
                    id="breedID"
                    type="text"
                    name="breed"
                    onChange={handleChange}
                    placeholder="Breed"
                />
                <br />
                <input
                    id="genderID"
                    type="text"
                    name="gender"
                    onChange={handleChange}
                    placeholder="Male/Female"
                />
                <br />
                <input
                    id="birthDateID"
                    type="text"
                    name="birthDate"
                    onChange={handleChange}
                    placeholder="date/month/year"
                />
                <br />
                <button onClick={createOne}>
                    Insert a dog with given parameters into the system
                </button>
                <div id="dogCreatedNow"></div>
                <input
                    id="deleteID"
                    type="text"
                    name="toBeDeleted"
                    onChange={handleChange}
                    placeholder="Name of Dog to be Deleted"
                />

                <button onClick={removeOne}>
                    Click here to remove a dog
                </button>
                <div id="dogToDie"></div>
            </form>
        </div>
    );
}
