import React from 'react';
import ControlRoom from '../../../store/ControlRoom.store';
import Elevator from './Elevator';
import './Elevators.css';


const controlRoom = ControlRoom;

export default () => {
  const {elevators, floors} = controlRoom;

  return (
    <div id='elevators-container'>
    {/* // style={{height: 'auto'}}> */}
      {elevators.map(elevator => <Elevator key={'elevator'+elevator.elevatorNumber}  elevator={elevator}/>)}
      </div>
  )
}