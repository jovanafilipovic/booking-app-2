"use client"

import { Label } from "./label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import React, { CSSProperties } from 'react';
import '../css/homepage.css';

export default function TimeDropdown() {
  return (
        <div>
          <div className="dropdown-area">
            <Select defaultValue="time">
              <SelectTrigger className="dropdown-start" id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="submenu-area">
                <SelectItem value="time" disabled>Termin</SelectItem>
                <SelectItem value="term1">10:00 - 11:00</SelectItem>
                <SelectItem value="term2">11:00 - 12:00</SelectItem>
                <SelectItem value="term3">12:00 - 13:00</SelectItem>
                <SelectItem value="term4">13:00 - 14:00</SelectItem>
                <SelectItem value="term5">14:00 - 15:00</SelectItem>
                <SelectItem value="term6">15:00 - 16:00</SelectItem>
                <SelectItem value="term7">16:00 - 17:00</SelectItem>
                <SelectItem value="term8">17:00 - 18:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
  )
}