import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import {
    Box,
    Button,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    useTheme,
} from '@mui/material';
import { tokens } from '../theme';

export const AddForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        telephone: '',
        cin: '',
        datenaiss: '',
        sexe: '',
        type: ''
    });

    //Verification si le membre est senior
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

    //Verification si le numero de telephone est valide
    
    const verifyTel = (n) => {
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (verifYear(formData.datenaiss)) {
            try {
                await axios.post('http://localhost:8080/membre', formData)
                    .then((response) => {
                        console.log(response);
                        Swal.fire({ title: 'Notification', text: 'Nouvelle enregistrement', icon: 'success' });
                        setFormData({
                            nom: '',
                            prenom: '',
                            email: '',
                            adresse: '',
                            telephone: '',
                            cin: '',
                            datenaiss: '',
                            sexe: '',
                            type: ''
                        })
                    })
                    .catch(errors => {
                        console.log(errors);
                        Swal.showLoading(Swal.getDenyButton())
                    });
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
    };



    return (
        <Box m="20px" style={{'marginTop': '35px'}}>
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
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"

                        >
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="Nom"
                                value={formData.nom}
                                onChange={e => setFormData({ ...formData, nom: e.target.value.toUpperCase() })}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="Prénoms"
                                value={formData.prenom}
                                style={{ textTransform: "capitalize" }}
                                onChange={e => setFormData({ ...formData, prenom: e.target.value.replace(/(^|\s)\S/g, (match) => match.toUpperCase()) })}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="number"
                                label="Téléphone"
                                value={formData.telephone}
                                sx={{ gridColumn: "span 2" }}
                                onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                                onChangeCapture={verifyTel(formData.telephone)}
                                maxLength={12}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="CIN ou SIRET"
                                value={formData.cin}
                                sx={{ gridColumn: "span 2" }}
                                onChange={e => setFormData({ ...formData, cin: e.target.value })}
                                onChangeCapture={verifyTel(formData.telephone)}
                                maxLength={12}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="Adresse"
                                value={formData.adresse}
                                onChange={e => setFormData({ ...formData, adresse: e.target.value })}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                required
                                variant="filled"
                                type="date"
                                label="Date de Naissance"
                                value={formData.datenaiss}
                                onChange={e => setFormData({ ...formData, datenaiss: new Date(e.target.value).toISOString().split('T')[0] })}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <Select
                                fullWidth
                                required
                                variant="filled"
                                type="text"
                                label="Sexe"
                                value={formData.sexe}
                                onChange={e => setFormData({ ...formData, sexe: e.target.value })}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="F">Femme</MenuItem>   
                                <MenuItem value="M">Homme</MenuItem> 
                            </Select>

                            <FormLabel component="Type">Type: </FormLabel>
                            <RadioGroup
                                aria-label='Type'
                                name='type'
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                color='white'
                            >
                                <FormControlLabel value="Personne" control={<Radio/>} label="Personne" />
                                <FormControlLabel value="Entreprise" control={<Radio/>} label="Entreprise" />
                            </RadioGroup>
                            

                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Enregistrer
                            </Button>
                        </Box>
                    </form>
                    <fieldset style={{ "width": "50%", "marginLeft": "30px" }}>
                        <img src={require("../asset/img/cci.jpg")} alt="" style={{ "maxWidth": "100%" }} />
                    </fieldset>
                </Box>
            </Box>
        </Box>
    )
}

export default AddForm
