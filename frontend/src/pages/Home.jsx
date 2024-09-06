import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', login)
      .then((response) => {
        if (response.data[0].Nbre === 1) {
          navigate('/accueil');
          Swal.fire({
            title: 'Reussi!',
            text: 'Bienvenu',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            
          });
          sessionStorage.setItem('user', JSON.stringify(response.data[0]));
          sessionStorage.setItem('user.name', JSON.stringify(response.data[0].pseudo));
          sessionStorage.setItem('user.email', JSON.stringify(response.data[0].email));
          sessionStorage.setItem('user.permission', JSON.stringify(response.data[0].permission));
          window.location.reload();
        }
        else {
          Swal.fire({
            title: 'Erreur!',
            text: 'Reessayer',
            icon: 'error',
            timer: 1000,
            timerProgressBar: true
          })
        }

      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          title: 'Erreur!',
          text: 'Reessayer',
          icon: 'error'
        })
      })
  };



  return (
    <>
      <Box className="formulaire">
        <div className="background">
          <div className="shape">
            <h4 className="deco">
              Demmande
            </h4>
          </div>
          <div className="shape">
            <h4 className="deco">
              Offre
            </h4>
          </div>
        </div>
        <div className="log">
          <form onSubmit={handleLogin}>
            <h3>AUTHENTIFICATION</h3>

            <label for="email">Adresse e-mail</label>
            <input className='form-group' type="email" placeholder="Email" id="email" onChange={e => setLogin({ ...login, email: e.target.value })} required />

            <label for="password">Mot de passe</label>
            <input type="password" placeholder="Password" onChange={e => setLogin({ ...login, password: e.target.value })} required />

            <button className='btn btn-primary'> Connexion </button>
          </form>
        </div>

      </Box>


    </>
  );
}

export default Home;