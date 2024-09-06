import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    TextField,
    useTheme,
} from '@mui/material';
import { tokens } from '../theme';

export const ReadUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams()

    const [values, setValues] = useState({
        pseudo: '',
        email: '',
        permission: '',
    });

    useEffect(() => {
        const fetchvalues = async () => {
            try {
                await axios.get('http://localhost:8080/user/read/' + id)
                    .then(res => {
                        console.log("Voici le data:", res.data[0]);

                        setValues({
                            pseudo: res.data[0].pseudo,
                            email: res.data[0].email,
                            permission: res.data[0].permission,


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
        navigate('/users')
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
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            style={{"color": "white"}}
                        >
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="text"
                                label="Pseudo"
                                value={values.pseudo}
                                onChange={e => setValues({ ...values, pseudo: e.target.value })}
                                sx={{ gridColumn: "span 2" }}
                                disabled
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
                                disabled
                            />
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                type="text"
                                label="Permission"
                                value={values.permission}
                                sx={{ gridColumn: "span 4" }}
                                onChange={e => setValues({ ...values, permission: e.target.value })}
                                disabled
                            />
                            
                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Retour
                            </Button>
                        </Box>
                    </form>
                    <fieldset style={{ "width": "50%", "marginLeft": "30px" }}>
                        <img src={require("../asset/img/print.gif")} alt="" style={{ "maxWidth": "100%", "height": "100%" }} />
                    </fieldset>
                </Box>
            </Box>
        </Box>
    )
}

export default ReadUser
