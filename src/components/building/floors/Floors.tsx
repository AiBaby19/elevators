import React from 'react';
import Floor from './floor/Floor';
import { observer } from "mobx-react-lite"
import ControlRoom from '../../../store/ControlRoom.store';

const controlRoom = ControlRoom;

export default observer(() => {
  const {floors, elevators} = controlRoom;
  return <div id='floors-container' 
  style={{height: 5 * floors.length + 'em' ,width: elevators.length > 0 ? 5 * elevators.length + 'em' : '5em'}}>
  {floors.map(floor => <Floor key={'floor'+floor.floorNumber} floor={floor}/>)}
  </div>
})

