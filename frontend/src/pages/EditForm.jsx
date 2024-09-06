import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    Typography,
    useTheme,
} from '@mui/material';
import { tokens } from '../theme';
import MobileFriendly from "@mui/icons-material/MobileFriendly";
import MailOutline from "@mui/icons-material/MailOutline";
import MapsHomeWorkOutlined  from "@mui/icons-material/MapsHomeWorkOutlined";
import CalendarMonth from "@mui/icons-material/CalendarMonth";

export const EditForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams()

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
        navigate('/membres')
    };

    return (
        <Box m="20px">
            
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
                    <fieldset style={{ "width": "50%", "height": "auto", "marginRight": "30px" }}>
                        <img src={require("../asset/img/icone.jpg")} alt="" style={{ "maxWidth": "100%", "borderRadius": "50%", }} />
                        <h4 className='labInfo'>{values.nom + " " + values.prenom}</h4>
                    </fieldset>

                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"

                        >

                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                sx={{ m: "15px 0 5px 20px", gridColumn: "span 2"  }}
                            >
                                <MailOutline />
                                {values.email}
                            </Typography>
                            <br />
                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                sx={{ m: "15px 0 5px 20px", gridColumn: "span 2" }}
                                
                            >
                                <MobileFriendly />
                                0{values.telephone}
                            </Typography>
                            <br />
                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                sx={{ m: "15px 0 5px 20px", gridColumn: "span 2" }}
                                
                            >
                                <MapsHomeWorkOutlined />
                                {values.adresse}
                            </Typography>
                            <br />
                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                sx={{ m: "15px 0 5px 20px", gridColumn: "span 2" }}
                                
                            >
                                <CalendarMonth />
                                {new Date(values.datenaiss).toLocaleDateString()}
                            </Typography>

                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Retour
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default EditForm
