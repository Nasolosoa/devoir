/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../theme';
import Header from "../component/Header";
import Swal from 'sweetalert2';

export const UserList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('http://localhost:8080/users')
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
            field: "pseudo",
            headerName: "Nom d'Utilisateur",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "permission",
            headerName: "Permission",
            flex: 1,
            renderCell: ({ row: { permission } }) => {
                return (
                    <Box
                        width="60%"
                        height="100%"
                        paddingTop="15px"
                        display="flex"
                        justifyContent="left"

                        borderRadius="4px"
                    >
                        {permission === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {permission === "manager" && <SecurityOutlinedIcon />}
                        {permission === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {(permission).toUpperCase()}
                        </Typography>
                    </Box>
                );
            },
        }
    ];

    const permission = JSON.parse(sessionStorage.getItem("user.permission"));
    const navigate = useNavigate();
    const handleRowClick = (params) => {
        const id = params.row.id;
        Swal.fire({
            title: "Adminer",
            icon: "question",
            text: `Que voulez-vous faire avec l'ID: ${id}`,
            denyButtonText: "Supprimer",
            showDenyButton: true,
            confirmButtonText: "Informations",
            showCloseButton: true
        })
            .then(res => {
                if (res.isDenied) {
                    if ((permission).toLowerCase() === "admin") {
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
                    navigate('/read/user/' + id)
                }
            })

    };

    const perm = JSON.parse(sessionStorage.getItem('user.permission'));
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
                    if (perm !== "admin") {
                        axios.delete('http://localhost:8080/users/delete/' + id)
                            .then(response => {
                                Swal.fire({
                                    title: "Reussi",
                                    text: `Information supprimer pour: ${id}`,
                                    icon: "success",
                                    showCloseButton: true,
                                    timer: 2000,
                                    timerProgressBar: true
                                })
                                navigate('/users')
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
                    }
                    else {
                        Swal.fire({
                            title: "Erreur",
                            text: `Admin, vous devez nommer un utilisateur pour vous remplacer avant de pouvoir supprimer votre compte`,
                            icon: "error",
                            showCloseButton: true,

                        })
                    }

                }
            })
    }


    return (

        <Box m="20px">
            <Header
                title="UTILISATEURS"
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
                    onRowClick={handleRowClick}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                />
            </Box>
        </Box>
    );
};
//onRowClick={handleRowClick}
export default UserList;