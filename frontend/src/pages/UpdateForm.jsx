import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    FormLabel,
    TextField,
    useTheme,
} from '@mui/material';
import { tokens } from '../theme';

export const EditForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams()

    const date = new Date();
    const year = date.getFullYear();
    const verifYear = (n) => {
        const daty = new Date(n);
        const an = daty.getFullYear();
        if (year - an < 20) {
            Swal.fire({ title: 'Alerte', text: 'Age doit pas inferieur à 20', icon: 'warning' })
            return false
        }
        return true
    }


    const [values, setValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        telephone: '',
        datenaiss: '',
        sexe: ''
    });

    useEffect(() => {
        const fetchvalues = async () => {
            try {
                await axios.get('http://localhost:8080/membre/read/' + id)
                    .then(res => {
                        console.log("Voici le data:", res.data[0]);

                        setValues({
                            nom: res.data[0].nom,
                            prenom: res.data[0].prenom,
                            email: res.data[0].email,
                            adresse: res.data[0].adresse,
                            telephone: res.data[0].telephone,
                            datenaiss: new Date(res.data[0].datenaiss).toISOString().split('T')[0]

                            //toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } catch (error) {
                console.error(error);
            }
        };
        fetchvalues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Avertissement',
            text: 'Voulez-vous vraiment modifier cet enregistremement',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            showLoaderOnConfirm: true,
            icon: 'warning'
        }).then(res => {
            if (res.isConfirmed) {
                if (verifYear(values.datenaiss)) {
                    try {
                        axios.put('http://localhost:8080/membre/update/' + id, values)
                            .then((response) => {
                                console.log(response);
                                Swal.fire({ title: 'Notification', text: 'Modification reussi', icon: 'info',timer: 1000 })
                                navigate('/membres')
                            })
                            .catch(errors => {
                                console.log(errors);
                                Swal.showLoading(Swal.getDenyButton())
                            });
                    } catch (error) {
                        console.error('Erreur:', error);
                    }
                }
            }
        })
    };
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const verifyTel = (n) => {
        if (matchMedia(phoneRegExp, n).matches) {
            alert("Phone Set")
        }
    };

    return (
        <Box m="20px">
            {/***<Header title="FORMULAIRE D'ENREGISTREMENT" subtitle="Remplir le formulaire pour ajouter un nouvelle membre" />**** */}
            <Box
                m="20px"
                height="75vh"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    p="10px"
                    width="100%"
                    maxWidth="800px"
                    bgcolor={colors.primary[400]}
                    borderRadius="10px"
                    display={'flex'}
                >
                    <fieldset style={{ "width": "50%", "height": "auto", "marginRight": "30px"}}>
                        <img src={require("../asset/img/icone.jpg")} alt="" style={{ "maxWidth": "100%","borderRadius": "50%",  }} />
                        <h4 className='labInfo'>{values.nom + " "+ values.prenom}</h4>
                    </fieldset>

                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"

                        >
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="text"
                                label="Nom"
                                value={values.nom}
                                onChange={e => setValues({ ...values, nom: e.target.value.toUpperCase() })}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="text"
                                label="Prénoms"
                                value={values.prenom}
                                style={{ textTransform: "capitalize" }}
                                onChange={e => setValues({ ...values, prenom: e.target.value.replace(/(^|\s)\S/g, (match) => match.toUpperCase()) })}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="email"
                                label="Email"
                                value={values.email}
                                onChange={e => setValues({ ...values, email: e.target.value.toLowerCase() })}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="text"
                                label="Téléphone"
                                value={values.telephone}
                                sx={{ gridColumn: "span 4" }}
                                onChange={e => setValues({ ...values, telephone: e.target.value })}
                                onChangeCapture={verifyTel(values.telephone)}
                                maxLength={12}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="text"
                                label="Addresse"
                                value={values.adresse}
                                onChange={e => setValues({ ...values, adresse: e.target.value })}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="date"
                                value={values.datenaiss}
                                onChange={e => setValues({ ...values, datenaiss: e.target.value })}
                                sx={{ gridColumn: "span 2" }}
                            />
                            
                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Enregistrer
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default EditForm
