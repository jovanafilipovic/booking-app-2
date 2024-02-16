"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import '../css/homepage.css';
import React, { useState, useEffect } from 'react';

interface Location {
  id: string,
  itemType: string;
  name: string;
}


export default function LocationDropdown() {
  const [municipalities, setMunicipality] = useState<Location[]>([]);
  const [selectedMunicipality, setSelectedMunicipalityValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/api/locations/')
      .then(response => response.json())
      .then(data => {
        setMunicipality(data);
      })
      .catch(error => console.error('Error while fetching locations', error));
  }, []);

  const handleLocationSelect = (municipality: string) => {
    setSelectedMunicipalityValue(municipality);
  };

  return (
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2 dropdown-area">
            <Select defaultValue="location1">
              <SelectTrigger className="dropdown-start" id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="submenu-area">
                <SelectItem value="location1" disabled>Lokacija</SelectItem>
                {municipalities.map(municipality => (
                  <SelectItem key={municipality.id} value={municipality.name} onClick={() => handleLocationSelect(municipality.name)}>{municipality.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
  )
}