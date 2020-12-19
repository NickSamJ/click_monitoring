import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { IClick } from "./interfaces";
import axios from "axios";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Button, Container } from "@material-ui/core";
import { getRandomData } from "./config/RandomGenerator";
import { Routes } from "./Routes";

export const AppContext = React.createContext({ clicks: [] as IClick[] });

function App() {
  const [data, setData] = useState<IClick[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<IClick[]>("/api/clicks");
        setData(res.data);
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateRandomData = () => {
    setData(getRandomData(150, new Date(2020, 11, 18)));
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          clicks: data || [],
        }}
      >
        <Router>
          <Header />
          <Container>
            <Button
              variant="contained"
              color="secondary"
              onClick={generateRandomData}
            >
              Generate random data
            </Button>
            {loading ? <Loader /> : <Routes />}
          </Container>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
