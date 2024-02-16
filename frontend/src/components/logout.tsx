import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-day-picker";
const {
    logoutRoute
  } = require('../../../src/APIRoutes.js');

export default function Logout() {
  const navigate = useNavigate();
  const logout= async () => {

    const logoutUser = process.env.REACT_APP_LOCALHOST_KEY || "";
    const storedData = localStorage.getItem(logoutUser);
    if(storedData != null) {
        const id = await JSON.parse(
        storedData
        )._id;
        
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
        }
    }
  };
  return (
    <Button onClick={logout}>
    </Button>
  );
}


