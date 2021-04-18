export default class Elevator {
    elevatorNumber: number;
    status: 'available' | 'occupied' | 'unloadingPassengers' = 'available';
    previousTimeToReachFloor: number = 0;
    floorLocation: number = 0;
    currentTimeRemainingToReachFloor: any = window.setInterval(() => {} ,2000);

    constructor(elevatorNumber: number,) {
        this.elevatorNumber = elevatorNumber
    }
}