"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import React, { useState, useEffect } from 'react';
import '../css/homepage.css';

interface Sport {
  id: string,
  itemType: string;
  name: string;
}

interface SportDropdownProps {
  onSelectSport: (sport: string) => void
}

export default function SportDropdown({onSelectSport} : SportDropdownProps) {

  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {

    fetch('http://localhost:3002/api/sports/')
    .then(response => response.json())
    .then(data => { 
      setSports(data); 
      console.log(data);
    })
    .catch(error => console.error('Error  while fetching sports', error));
  }, []);

  const handleSportSelect = (selectedSport: string) => {
    onSelectSport(selectedSport);
  };

  return (
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2 dropdown-area">
            <Select defaultValue="sport">
              <SelectTrigger className="dropdown-start" id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="submenu-area">
              <SelectItem value="sport" disabled>Sport</SelectItem>
                {sports.map(sport => (
                  <SelectItem key={sport.id} value={sport.name} onClick={() => handleSportSelect(sport.name)}>
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
  )
}