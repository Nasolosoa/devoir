import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Deconnexion',
      text: 'Veuillez cliquer sur Confirmer avant 5s',
      background: '#fefefe',
      currentProgressStep: 1000,
      confirmButtonText: 'Confirmer',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      timerProgressBar: true,
      color: 'primary',
      timer: 5000,
      icon: 'warning'
    }).then((res) => {
      if(res.isConfirmed){
        sessionStorage.clear();
        navigate('/')
        window.location.reload();
      }
    })

  };


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton href="/parametres">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
