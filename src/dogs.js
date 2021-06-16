import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import './App.css';
import { URLDOGALL } from './apifacade';



class Dog extends React.Component {
    render() {
        return (
            <div>
                <h2>Her er en liste over de forskellige hunde:</h2>
            </div>
        );
    }
}

export function DogList() {


    useEffect(() => {
        fetchItems();
    }, []);

    const [dogs, setDogs] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(URLDOGALL);
        const doggoes = await data.json();
        setDogs(doggoes);


    }


    return (
        <div>
            <ReactBootStrap.Table striped bordered hover variant="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>BirthDate</th>
                        <th>Breed</th>
                        <th>Walkers</th>
                    </tr>
                </thead><tbody>
                    {dogs.map((test) => (
                        <tr key={test.name}>
                            <td>{test.name}</td>
                            <td>{test.gender}</td>
                            <td>{test.birthDate}</td>
                            <td>{test.breed}</td>
                            <td>{test.walkersDTO.name}</td>
                        </tr>
                    ))}
                </tbody>
            </ReactBootStrap.Table>
        </div >
    );

}
export default Dog;