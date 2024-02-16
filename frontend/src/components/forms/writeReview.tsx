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
import { useNavigate } from 'react-router-dom';
import StarRating from "../starRating";
import { Textarea } from "../textarea";
import '../../css/homepage.css';

export default function WriteReview() {

  const navigate = useNavigate();

  const login = () => {

    navigate('/');
  }


  return (
    <div className="review-body">
      <Card className="review-container">
        <CardHeader className="space-y-1 review-card-header">
          <CardTitle className="text-xl">Napiši recenziju</CardTitle>
        </CardHeader>
        <CardContent className="grid review-card-content">
          <div className="grid gap-2">
            <Label htmlFor="email">Ocena: </Label>
          <StarRating></StarRating>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Dodaj komentar: </Label>
            <Textarea className="review-comment"></Textarea>
          </div>
        </CardContent>
        <CardFooter className="review-footer">
          <Button className="w-full send-review-button">Pošalji</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
