import {
    LogOut,
  } from "lucide-react"
  
  import { Button } from "./button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
  } from "./dropdown-menu";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./avatar";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import React, { useState } from 'react';
  // import {logoutRoute} from "../../src/APIRoutes";
  const {
    logoutRoute
  } = require('../../src/APIRoutes.js');


  
  export default function ProfileDropdown() {

    const [isLoggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const openLoginPage = () => {
      if(!isLoggedIn) {
        navigate('/login');
      }
    }

    const logout= async () => {

      const logoutUser = process.env.REACT_APP_LOCALHOST_KEY || "";
      const storedData = localStorage.getItem(logoutUser);
      if(storedData != null) {
          const id = await JSON.parse(
          storedData
          )._id;
          try{
          const response = await axios.get(`${logoutRoute}/${id}`);
          if (response.status === 200) {
          localStorage.clear();
          navigate("/login");
          console.log("USPESNO STE SE IZLOGOVALI")
          }else{
            console.log("GRESKA")
            console.log("Server Error:", response.data);
          }
        }catch(error){
          console.log("OKEJ")
          console.log("Axios Error:", error);
        }
      }
    
    }


    return (

      
    
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="avatar-button" onClick={openLoginPage}>
            {/* <Avatar>
              <AvatarFallback className="avatar-inner">CN</AvatarFallback>
            </Avatar> */}
            {isLoggedIn? "" : "Uloguj se"}
            
          </Button>
        </DropdownMenuTrigger>
        {isLoggedIn && (
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <Button onClick={logout}>Izloguj se</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      
    )
  }
  