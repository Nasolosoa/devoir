import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FaInfo, FaStamp } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Sidenav from '../component/Sidenav';
import Footer from '../component/Footer';



function Contrat() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8083/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    })

    const Color = (dif) => {
        if (dif > 100) {
            return "green";
        }
        if (dif < 100 && dif > 30) {
            return "orange";
        }
        if (dif < 30 && dif > 0) {
            return "red";
        }
        else {
            return "transparent";
        }
    }

    /**(((((((((((((((((((((((()))))))))))))))))))))))) */
    

    return (
        <><Navbar />
            <Sidenav />
            <div className='d-flex justify-content-center' style={{ "marginLeft": "20%" }}>
                <div className='container'>
                    <h2 className='titre' style={{ "textDecoration": "underline", "fontFamily": "time new roman", "color": "darkgoldenrod" }}>LISTES DES CONTRAT</h2>
                    <Link to="/contrat/create" className='btn btn-success' style={{ "marginLeft": "48%" }} ><FaStamp /></Link>
                    <table className='table striped'>
                        <thead>
                            <tr>
                                <th>REFERENCE</th>
                                <th>RANG</th>
                                <th>DEBUT</th>
                                <th>FIN</th>
                                <th>RESTE</th>
                                <th>IM</th>
                                <th>ADMINER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr>
                                    <td>{d.ref}</td>
                                    <td>{d.rang}</td>
                                    <td>{d.deb}</td>
                                    <td>{d.fin}</td>
                                    <td style={{ "color": Color(d.dif) }}>{d.dif} jours</td>
                                    <td>{d.im}</td>
                                    <td>
                                        <Link to={`/contrat/read/${d.ref}`} className='btn'><FaInfo style={{ "color": "darkgreen" }} /></Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Contrat
