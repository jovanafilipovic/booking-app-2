"use client"

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import '../../css/login.css';
const {
  loginRoute
} = require('../../../src/APIRoutes.js');

export default function Login() {

  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions : ToastOptions= {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const localhostKey = process.env.REACT_APP_LOCALHOST_KEY || "";
    if (localStorage.getItem(localhostKey)) {
      navigate("/login");
    }
  }, []);

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const login = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      const loginUser = process.env.REACT_APP_LOCALHOST_KEY || "";
      if (data.status === true) {
        localStorage.setItem(
          loginUser,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
      console.log("LOGOVANJE")
    }
  };
  return (
    <div className="login-body">
      <form action="" onSubmit={(event) => login(event)}>
      <Card className="login-container">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-tomato">Uloguj se</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t line-break" />
            </div>
          </div>
          <div className="grid gap-2 mt-5">
            <Label htmlFor="email" className="text-tomato">Email adresa</Label>
            <Input id="email" className="login-input" type="email" placeholder="Email"  name="email" onChange={(e) => handleChange(e)} />
          </div>
          <div className="grid gap-2 mt-5">
            <Label htmlFor="password" className="text-tomato">Lozinka</Label>
            <Input id="password" className="login-input" type="password" placeholder="Lozinka" name="password" onChange={(e) => handleChange(e)} min="3"/>
          </div>
        </CardContent>
        <CardFooter className="login-footer">
          <Button className="w-full login-button" type="submit">Uloguj se</Button>
          <Link to="http://localhost:3000/signup" relative="path" className="create-acc-button">Kreiraj nalog</Link>
        </CardFooter>
      </Card>
      </form>
    </div>
  )
}
