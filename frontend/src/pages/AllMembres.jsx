/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../theme';
import Header from "../component/Header";
import Swal from 'sweetalert2';

export const AllMembre = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('http://localhost:8080/membre')
                    .then(response => {
                        setData(response.data);
                        console.log(data);
                    })
                    .catch(err => {
                        console.log(err)
                    })

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const columns = [
        {
            field: "id",
            headerName: "ID",
            cellClassName: "name-column--cell",

        },
        {
            field: "nom",
            headerName: "Nom",
            flex: 1,
        },
        {
            field: "prenom",
            headerName: "Prénoms",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "telephone",
            headerName: "Téléphone",
            flex: 1,
        },
        {
            field: "adresse",
            headerName: "Adresse",
            flex: 1,
        },
        {
            field: "cin",
            headerName: "CIN ou SINET",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
        }
    ];

    const username = JSON.parse(sessionStorage.getItem("user.name"));
    const navigate = useNavigate();
    const handleRowClick = (params) => {
        const id = params.row.id;
        Swal.fire({
            title: "Adminer",
            icon: "question",
            text: `Que voulez-vous faire avec l'ID: ${id}`,
            denyButtonText: "Supprimer",
            showDenyButton: true,
            confirmButtonText: "Modifier",
            showCloseButton: true
        })
            .then(res => {
                if (res.isDenied) {
                    if ((username).toLowerCase() === "admin") {
                        handleDelete(id);
                    }
                    else {
                        Swal.fire({
                            title: "Action refusé",
                            icon: "error",
                            text: `Vous n'avez pas le droits pour effectuer cette action`,

                        })
                    }
                }
                else if (res.isConfirmed) {
                    if ((username).toLowerCase() === "admin") {
                        navigate('/read/' + id)
                    }
                    else {
                        Swal.fire({
                            title: "Action refusé",
                            icon: "error",
                            text: `Vous n'avez pas le droits pour effectuer cette action`,

                        })
                    }
                }
            })

    };
    const handleCellClick = (params) => {
        const email = params.row.email;
        Swal.fire({
            title: "mail.ccihm.org",
            icon: "info",
            text: `Envoyer un courrier à : ${email}`,
            confirmButtonText: "Continuer",
            showCloseButton: true
        })
            .then(res => {
                if (res.isConfirmed) {

                }
            })

    };
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Suppression',
            text: 'Cette action est irreversible',
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continuer',
            cancelButtonText: 'Abandonner',
        })
            .then(res => {
                if (res.isConfirmed) {
                    try {
                        axios.delete('http://localhost:8080/membre/delete/' + id)
                            .then(response => {
                                Swal.fire({
                                    title: "Reussi",
                                    text: `Information supprimer pour: ${id}`,
                                    icon: "success",
                                    showCloseButton: true,
                                    timer: 2000,
                                    timerProgressBar: true
                                })
                                navigate('/membres')
                            })
                            .catch(err => {
                                console.log(err);
                                Swal.fire({
                                    title: "Erreur",
                                    text: `Information du ${id} reste intact`,
                                    icon: "error",
                                    showCloseButton: true,
                                    timer: 2000,
                                    timerProgressBar: true
                                })
                            })

                    } catch (error) {
                        console.error(error);
                    }
                }
            })
    }


    return (

        <Box m="20px">
            <Header
                title="MEMBRES"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >

                <DataGrid
                    rows={data}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    hideFooterPagination
                    onCellClick={handleCellClick}
                    hideFooterSelectedRowCount
                    disableMultipleRowSelection
                    checkboxSelection
                    onRowClick={handleRowClick}
                />
            </Box>
        </Box>
    );
};
//onRowClick={handleRowClick}
export default AllMembre;