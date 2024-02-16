"use client"

import { Button } from "../button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card"
import { Input } from "../input"
import { Label } from "../label";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../css/createacc.css';
import axios from 'axios';
import { ToastContainer, ToastOptions, toast } from "react-toastify";
const {
  registerRoute
} = require('../../../src/APIRoutes.js');


// const backendUrl = 'http://localhost:3001/'; // Replace YOUR_BACKEND_PORT with the actual port
// const signUpUrl = `${backendUrl}/api/signUp`;

export default function CreateAccount() {

  const navigate = useNavigate();

  const toastOptions : ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const signup = async () => {
  //   try {
  //     await axios.post('http://localhost:3002/api/create', { email, password });
  //     navigate('/login');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    const localhostKey = process.env.REACT_APP_LOCALHOST_KEY || "";
    if (localStorage.getItem(localhostKey)) {
      navigate("/signup");
    }
  }, []);

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password, email } = values;
    if  (password.length < 8) {
      toast.error(
        "Lozinka mora imati minimum 8 karaktera.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Niste uneli email adresu.",
      toastOptions
      );
      return false;
    } else if (username === "") {
      toast.error("Niste uneli korisničko ime.",
      toastOptions
      );
      return false;
    }

    return true;
  };

  const signUp = async (event: any) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post("http://localhost:3002/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(data);

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        console.log("GRESKA");
      }

      const signUpUser = process.env.REACT_APP_LOCALHOST_KEY || '';

      if (data.status === true) {
        localStorage.setItem(
          signUpUser,
          JSON.stringify(data.user)
        );
        console.log("SACUVAJ");
        navigate("/login");
      }
      console.log("USPELO");
    }
    console.log("NEUSPELO")

  };

  return (

    <div className="signup-body">
      <form action="" onSubmit={(event) => signUp(event)}>
      <Card className="signup-container">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-tomato">Registracija</CardTitle>
          {/* <CardDescription className="text-description-signup">
            Koristite Google nalog za registraciju
          </CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <div >
            <Button variant="outline" className="signup-google-button">
              Google nalog
            </Button>
          </div>
          <div className="relative break-line">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t line-break-signup" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground line-break-text">
                Ili nastavite sa
              </span>
            </div>
          </div> */}
           <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t line-break" />
            </div>
          </div>
          <div className="grid gap-2 mt-5">
            <Label htmlFor="username" className="text-tomato">Korisničko ime</Label>
            <Input id="username" className="signup-input" type="username" name="username" placeholder="Korisničko ime" onChange={(e) => handleChange(e)}/>
          </div>
          <div className="grid gap-2 mt-5">
            <Label htmlFor="email" className="text-tomato">Email adresa</Label>
            <Input id="email" className="signup-input" type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e)}/>
          </div>
          <div className="grid gap-2 mt-5">
            <Label htmlFor="password" className="text-tomato">Lozinka</Label>
            <Input id="password" className="signup-input" type="password" name="password" placeholder="Lozinka" onChange={(e) => handleChange(e)} />
          </div> 
        </CardContent>
        <CardFooter className="signup-footer">
          <Button className="w-full signup-button" type="submit">Registuj se</Button>
        </CardFooter>
      </Card>
      </form>
    </div>
  )
}
