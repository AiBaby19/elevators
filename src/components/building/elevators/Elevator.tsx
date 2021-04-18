import { observer } from 'mobx-react-lite';
import React from 'react';
import ControlRoom from '../../../store/ControlRoom.store';
import Elevator from '../../../types/elevators/Elevator';
const controlRoom = ControlRoom;

type ElevatorType = {
  elevator: Elevator
}

export default observer(({elevator}: ElevatorType) => {
  return <div id='elevator'>{'elevator '+elevator.elevatorNumber}</div>
})

