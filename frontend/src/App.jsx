import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

import './asset/css/style.css'
import AddForm from "./pages/AddForm";
import EditForm from "./pages/EditForm";
import Home from "./pages/Home";
import Accueil from "./pages/Accueil";
import AllMembre from "./pages/AllMembres";
import MessengerPage from "./pages/MessengerPage";
import Parametres from "./pages/Parametres";
import UserList from "./pages/UserList";
import ReadUser from "./pages/ReadUser";

function App() {
  const [theme, colorMode] = useMode();
  const user = sessionStorage.getItem("user");
  const [isSidebar, setIsSidebar] = useState(true);

  if (!(user)) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          <Sidebar isSidebar={isSidebar}/>
          <main className="content">
            <Navbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/membres" element={<AllMembre />} />
                <Route path="/Users" element={<UserList />} />
                <Route path="/add" element={<AddForm />} />
                <Route path="/read/:id" element={<EditForm />} />
                <Route path="/read/user/:id" element={<ReadUser />} />

                <Route path="/messenger" element={<MessengerPage />} />
                <Route path="/parametres" element={<Parametres />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;