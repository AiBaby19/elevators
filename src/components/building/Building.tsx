import React from 'react';
import { observer } from "mobx-react-lite"
import ControlRoom from '../../store/ControlRoom.store';
import Floors from '../../components/building/floors/Floors';
import Elevators from './elevators/Elevators';
import './Building.css'

const controlRoom = ControlRoom;

export default observer(() => {
  const {floors, elevators, setFloorAmount, setElevatorAmount} = controlRoom;
  return (
  <div>
    <label htmlFor="floors">Set Floors Amount</label>
    <input 
    name='floors'
    type='number'
    onChange={(e) => setFloorAmount(Number(e.target.value))}
    />

    <label htmlFor="elevators">Set Elevators Amount</label>
    <input 
    name='elevators'
    type='number'
    onChange={(e) => setElevatorAmount(Number(e.target.value))}
    />
    <div id='building-container'>
      <Floors/>
      <Elevators/>
    </div>
  </div>
  )
});