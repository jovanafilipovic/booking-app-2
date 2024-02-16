import * as React from "react"

import { Button } from "../button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card"
import { Label } from "../label"
import TimeDropdown from "../timeDropdown";
import { useNavigate } from 'react-router-dom';
import '../../css/reservation.css';

interface Court {
  itemType: string,
  name: string,
  address: string,
  municipality: string,
  sports: [],
  images: string[]
}

interface ReservationProps {
  court: Court;
}

export default function Reservation({court} : ReservationProps) {

  React.useEffect(() => {
    console.log('Court data:', court);
  }, [court])
  
  const navigate = useNavigate();

  const cancelReservation = () => {
    navigate('/');
  }

  return (
    <div className="reservation-body">
      <Card className="w-[350px] reservation-container">
        <CardHeader>
          <CardTitle className="text-tomato">Rezervišite termin za {court.name}</CardTitle>
          <CardDescription className="text-description">Odaberite odgovarajuće vreme i izvršite rezervaciju.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework" className="text-tomato">Dostupni termini za odabrani datum:</Label>
                <div className="time-dropdown">
                  <TimeDropdown></TimeDropdown>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between reservation-footer">
          <Button variant="outline" className="cancel-button" onClick={cancelReservation}>Otkaži</Button>
          <Button className="reservation-button">Rezerviši</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
