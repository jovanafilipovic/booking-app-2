"use client"

import SportDropdown from '../sportDropdown';
import LocationDropdown from '../locationDropdown';
import ObjectCard from '../objectCard';
import ProfileDropdown from '../profileDropdown';
import React, { useState, useEffect } from 'react';
import '../../css/homepage.css';

interface Court {
  id: string,
  itemType: string,
  name: string,
  address: string,
  municipality: string,
  sports: [],
  images: string[],
}

export default function HomePage() {
      
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/api/courts')
      .then(response => response.json())
      .then(data => {
        setCourts(data);
      })
      .catch(error => console.error('Error while fetching court data', error));
  }, []);

const filteredCourts = courts.filter(court => {
  const municipalityFilter = !selectedMunicipality || court.municipality === selectedMunicipality;
  return municipalityFilter;
});

console.log(selectedMunicipality)


  return (
    <div className='container'>
    <div className='dropdowns'>
      {/* <SportDropdown onSelectSport={courts}/> */}
      <LocationDropdown />
      <ProfileDropdown></ProfileDropdown>
      </div>
      <div className='section'>
        <div className='section-title'>Dostupni objekti</div>
        <div className='cards-space-around'>
          <div className='cards-row'>
          {filteredCourts.map(court => (
              <ObjectCard key={court.id} court={court}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
