import ObjectCardPreview from "./objectCardPreview";
import React, { useState, useEffect } from 'react';
import '../css/homepage.css';

interface Court {
  itemType: string,
  name: string;
  address: string;
  municipality: string;
  sports: [],
  images: string[]
}

interface ObjectCardProps {
  court: Court;
}

export default function ObjectCard({ court }: ObjectCardProps) {

  const [courts, setCourts] = useState<Court[]>([]);

  return (
    <div className="object-card-container">
      <div className="card-court-name">{court.name}</div>
      <div className="slider">
        {court.images.length > 0 && (
          <img className="slider-image" src={court.images[0]} alt="First Image" />
         )}
      </div> 
      <div>
        <ObjectCardPreview court={court}/>
      </div>
    </div>
  )
}
