import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import Header from "../component/Header";

const Parametres = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px" style={{maxHeight: '100dvh'}}>
            <Header
                title="PARAMETRES"
            />
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Information personnelles
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        La gestion de compte utilisateur permet à un utiliateur de
                        modifier ses informations d'accés dans son domaine.
                        <br />
                        Cliquer <a href="/parametres/profile">ici</a> pour gerer votre profile et confidentialité.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Options Payement
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Dans cette partie, vous pouvez modifier vos données pour la domaine
                        financière
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Historique d'activité
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Ici, vous pouvez voir les historiques de vos activité personnelle, le bilan et aussi le rapport du passée.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Localisation et itineraires
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <img src={require('../asset/img/globe.gif')} alt="" height="200px" style={{ float: 'right', marginRight: '30%' }} />
                        L'application detectera l'emplacement exacte de votre appareil et l'affichera sur l'ecran. <br />
                        Vous avez le choix de partager vote localisation ou pas avec les membres. <br />
                        Vous pouvez aussi voir l'itineraires vers un destination de votre choix.

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        The Final Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default Parametres;
