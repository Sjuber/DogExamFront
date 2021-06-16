import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { URLDOGDEWAK } from "./settings";
import * as ReactBootStrap from "react-bootstrap";
import './App.css';



function WalkerSorteder() {

    var thedog = document.getElementById("theDog").value;
    useEffect(() => {
        fetchItems();
    }, []);

    const [walkers, setWalkers] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(URLDOGDEWAK + "/" + thedog);
        const walkeres = await data.json();
        setWalkers(walkeres);


    }


    return (
        <div>
            <ReactBootStrap.Table striped bordered hover variant="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead><tbody>
                    {walkers.map((test) => (
                        <tr key={test.name}>
                            <td>{test.name}</td>
                            <td>{test.address}</td>
                            <td>{test.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </ReactBootStrap.Table>
        </div >
    );

}
export default WalkerSorteder;