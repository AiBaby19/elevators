import { observer } from 'mobx-react-lite';
import React from 'react';
import Floor from '../../../../types/floors/Floor';
import '../Floors.css';
import ControlRoom from '../../../../store/ControlRoom.store';

const controlRoom = ControlRoom;

type FloorType = {
  floor: Floor;
}
export default observer(({floor}: FloorType) => {
  const {floors, elevators} = controlRoom;

  return <div className='floor' style={{width: elevators.length > 0 ? 5 * elevators.length + 'em' : '5em'}}>{floor.floorNumber}</div>
})