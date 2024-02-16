import { Button } from "./button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import React, {useState, useEffect} from 'react';
import '../css/homepage.css';
import StarRating from "./starRating";
import WriteReview from '../components/forms/writeReview';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Reservation from "./forms/reservation";

interface Court {
  itemType: string,
  name: string,
  address: string,
  municipality: string,
  sports: [],
  images: string[]
}

interface ObjectCardPreviewProps {
  court: Court;
}

export default function ObjectCardPreview({ court }: ObjectCardPreviewProps) {

  const navigate = useNavigate();
  const [isWriteReviewVisible, setWriteReviewVisible] = useState(false);
  const [isReservationVisible, setReservationVisible] = React.useState(false);


  const reserve = () => {
    
    navigate('/reservation', {state: {court}});
    
  }
  const writeReview = () => {
    setWriteReviewVisible(!isWriteReviewVisible);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="card-button">Pogledaj objekat</Button>
      </SheetTrigger>
      <SheetContent className="preview-container">
        <SheetHeader>
          <SheetTitle className="grid gap-4 py-4 preview-court-name">{court.name}</SheetTitle>
          <SheetDescription className="preview-court-address">
            {court.address}
          </SheetDescription>
          {/* <div className="rating">
          <StarRating></StarRating>
          <Button className="recension-preview-button" type="submit" onClick={writeReview}>Napiši recenziju</Button>
          </div> */}
        </SheetHeader>
        { court.images.length > 0 ? (
        <div className="slider-preview">
          <Slide>
            {court.images.map((imageUrl, index) => (
              <div key={index} className="slide-image" style={{ backgroundImage: `url(${imageUrl})` }}>
              </div>
            ))}
          </Slide>
        </div>
        ) : (
          <div className="no-photos-placeholder">
            Nema dostupnih fotografija
          </div>
        )
        }
        <SheetFooter>
        
          <SheetClose asChild>
            <Button className="reserve-preview-button" type="submit" onClick={reserve}>Rezerviši</Button>
          </SheetClose>
        </SheetFooter>
        {/* {isWriteReviewVisible && <WriteReview/>} */}
        <Reservation court={court} />
      </SheetContent>
    </Sheet>
  )
}
