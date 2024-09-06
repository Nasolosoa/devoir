import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Sidenav from '../component/Sidenav';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';

function CreateCont() {
    const [data, setData] = useState([])
    const [values, setValues] = useState({
        ref: '',
        rang: '',
        deb: '',
        fin: '',
        dure: '',
        im: ''
    });
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                console.log(res);
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    //let dateControl = document.querySelector('input[type = "datetime-local"]')

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8083/create/", values)
            .then(res => {
                Swal.fire({ title: "Enregistré !", text: "Requette reussi ", icon: "success" });
                console.log(res);
                navigate("/contrat");
            })
            .catch(err => {
                console.log(err);
                Swal.fire({ title: "Erreur !", text: "Requette refusé ", icon: "error" });
            })
    };
    const Autofill = (n) => {
        if (n === '1') {
            return '1 an'
        }
        else {
            return 'Indefinie'
        }

    }

    return (
        <div>
            <>
                <Navbar />
                <Sidenav />
                <div className='container'>

                    <div className="formulaire bg-white rounded p-3" style={{ "zIndex": "3", "width": "600px", "marginLeft": "310px" }}>
                        <form id='form' onSubmit={handleSubmit}>
                            <h2 className='titre' style={{ "textDecoration": "underline", "fontFamily": "time new roman", "color": "darkgoldenrod" }}>NOUVELLE CONTRAT</h2>

                            <div className="mb-2">
                                <label htmlFor="">REFERENCE</label>
                                <input type="text" className="form-control" placeholder='Reference sur le contrat' onChange={e => setValues({ ...values, ref: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">RANG</label>
                                <input type="number" min={1} max={3} defaultValue={1} onVolumeChange={Autofill(values.rang)} className="form-control" placeholder='Rang de cette nouvelle contrat' onChange={e => setValues({ ...values, rang: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">DEBUT</label>
                                <input type="date" className="form-control" onChange={e => setValues({ ...values, deb: e.target.valueAsDate })} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">FIN</label>
                                <input type="date" className="form-control" onChange={e => setValues({ ...values, fin: e.target.valueAsDate })} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">DUREE</label>
                                <input type="text" className="form-control" value={Autofill(values.rang)} onChange={e => setValues({ ...values, dure: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">IM</label>
                                <select type="date" className="form-control" onChange={e => setValues({ ...values, im: e.target.value })} required>
                                    <option>__Identifier le personnel__</option>
                                    {data.map((enseignant) => <option>{enseignant.im}</option>)}
                                </select>
                            </div>
                            <button className="btn btn-success">Enregistrer</button>
                            <Link to='/contrat' className='btn btn-light'>Annuler</Link>

                        </form>
                    </div>
                </div>
                <Footer />
            </>
        </div>
    )
}

export default CreateCont
