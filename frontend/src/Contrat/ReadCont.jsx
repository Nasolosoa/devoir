import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Sidenav from '../component/Sidenav';
import { FaAdjust, FaEdit, FaPenAlt, FaRegListAlt } from 'react-icons/fa';
import Footer from '../component/Footer';

function ReadEns() {
    const { ref } = useParams();
    const [values, setValues] = useState({
        ref: '',
        rang: '',
        deb: '',
        fin: '',
        dif: '',
        im: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8083/contrat/read/' + ref)
            .then(res => {
                console.log(res);
                setValues({ ...values, ref: res.data[0].ref, rang: res.data[0].rang, deb: res.data[0].deb, fin: res.data[0].fin, dif: res.data[0].dif, im: res.data[0].im })
            })
            .catch(err => console.log(err))
    }, []);

    const [Valens, setValens] = useState({
        nom: '',
        prenom: ''
    });
    const handleNom = (im) => {
        axios.get('http://localhost:8081/enseignant/read/' + im)
            .then(res => {
                console.log(res);
                setValens({ ...Valens, nom: res.data[0].nom, prenom: res.data[0].prenom })

            })
            .catch(err => console.log(err))
        return Valens.nom + " " + Valens.prenom;

    };

    const Pluri = (n) => {
        if (n > 1) {
            return 's';
        }
        else {
            return ''
        }
    }
    return (
        <div>
            <>
                <Navbar />
                <Sidenav />
                <div className='container w3-cell'>

                    <div className="formulaire bg-white rounded p-3" style={{ "zIndex": "3", "width": "600px", "marginLeft": "310px" }}>
                        <form id='form'>
                            <h2 className='titre' style={{ "textDecoration": "underline", "fontFamily": "time new roman", "color": "darkgoldenrod" }}>DETAIL DU CONTRAT</h2>
                            <div className="mb-2">
                                <label htmlFor="">REFERENCE</label>
                                <input type="text" className="form-control" value={values.ref} disabled />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">RANG</label>
                                <input type="text" className="form-control" value={values.rang} disabled />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">DEBUT</label>
                                <input type="text" className="form-control" value={values.deb} disabled />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">FIN</label>
                                <input type="text" className="form-control" value={values.fin} disabled />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">RESTANTE</label>
                                <input type="text" className="form-control" value={values.dif} disabled />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">ENSEIGNANT</label>
                                <input type="text" className="form-control" value={handleNom(values.im)} disabled />
                            </div>


                        </form>
                    </div>
                </div>



                
                <Footer />
            </>
        </div>

    )
}

export default ReadEns
