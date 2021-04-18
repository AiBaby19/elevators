import { makeObservable, observable, computed, action, flow, isObservableArray } from "mobx"
import Elevator from "../types/elevators/Elevator";
import Elevators from "../types/elevators/Elevators";
import { available, occupied, unloadingPassengers } from "../types/elevators/elevatorsStatuses";
import Floor from "../types/floors/Floor";
import Floors from "../types/floors/Floors";

class ControlRoom {
    floors: Floor[] = observable([]);
    elevators: Elevator[] = observable([]);
    floorsWaitingQueue: number[] = []

    constructor() {
        makeObservable(this, {
            floors: observable,
            elevators: observable,
            floorsWaitingQueue: observable,
            setElevatorAmount: action,
            setFloorAmount: action,
            getElevator: action,
            getElevatorStatus: action,
            getFloor: action,
            setElevatorStatus: action,
            addToFloorsWaitingQueue: action,
            removeFromWaitingQueue: action,
            callElevator: action,
        })
    }

    setElevatorAmount = (amount: number) => {
        if (!amount || amount === 0) return this.elevators = new Elevators().elevators;
        this.elevators = new Elevators().elevators;
        for(let i = 0; i <= amount -1; i++) {
            this.elevators.push(new Elevator(i))
        }
    };
    setFloorAmount = (amount: number): any => {
        if (!amount || amount === 0) return this.floors = new Floors().floors;
        this.floors = new Floors().floors;
        
        for(let i = 0; i <= amount - 1; i++) {
            this.floors.push(new Floor(i))
        }
    };
    getElevator = (elevatorNumber: number): Elevator => {
        return this.elevators.find(elevator => elevator.elevatorNumber = elevatorNumber) || new Elevator(0)
    };
    getElevatorStatus = (elevatorNumber: number) => {
        return this.getElevator(elevatorNumber).status; 
    };

    getFloor = (floorNumber: number): Floor | undefined => {
        return this.floors.find(floor => floor.floorNumber = floorNumber)
    };

    setElevatorStatus = (elevatorNumber: number, status: 'available' | 'occupied' | 'unloadingPassengers'): void => {
        this.elevators.forEach(elevator => elevator.elevatorNumber === elevatorNumber ? elevator.status = status : null)
    };

    setElevatorLocation = (elevatorNumber: number, floorNumber: number) => {
        this.elevators.forEach(elevator => elevator.elevatorNumber === elevatorNumber ? elevator.floorLocation = floorNumber : null)
    }

    addToFloorsWaitingQueue = (floorNumber: number): void => {
        this.floorsWaitingQueue.push(floorNumber)
    };
    removeFromWaitingQueue = (floorNumber: number): void => {
        this.floorsWaitingQueue = this.floorsWaitingQueue.filter(floor => floor !== floorNumber)
    };
    callElevator = (floorNumber: number) => {
        const availableElevator = this.findAvailableElevator();

        if (!availableElevator.length) return false;

        const {elevatorNumber} = this.findClosestElevator(floorNumber);

        this.sendElevatorToFloor(elevatorNumber, floorNumber);

    };

    findAvailableElevator = (): Elevator[] | [] => {
        return this.elevators.filter(({status}) => status === available)
    }

    findClosestElevator = (floorNumber: number) => {
        return this.elevators.reduce((prev: Elevator, curr: Elevator): Elevator => {
            return Math.abs(curr.floorLocation - floorNumber) < Math.abs(prev.floorLocation - floorNumber) ? curr : prev
        });
    }

    setPreviousTimeToReachFloor = (elevatorNumber: number, time: number) => {
        this.elevators.forEach(elevator => {
            if (elevator.elevatorNumber === elevatorNumber) {
                elevator.previousTimeToReachFloor = time
            }
        })
    }

    sendElevatorToFloor = (elevatorNumber: number, floorNumber: number) => {
        const timeToPassOneFloor = 2000;
        this.setElevatorStatus(elevatorNumber, occupied)

        if (elevatorNumber === floorNumber) {
            this.setPreviousTimeToReachFloor(elevatorNumber, 0);
            this.setElevatorLocation(elevatorNumber, floorNumber)
        }
        const isElevatorGoingUp = elevatorNumber < floorNumber;

        if (elevatorNumber > floorNumber) {
            this.elevators.forEach(elevator => {
                if (elevator.elevatorNumber === floorNumber) {
                    this.setElevatorLocation(elevatorNumber, floorNumber)
                    clearInterval(elevator.currentTimeRemainingToReachFloor);
                }

                elevator.currentTimeRemainingToReachFloor = setInterval(() => {
                    this.setPreviousTimeToReachFloor(elevatorNumber, timeToPassOneFloor);
                    elevator.floorLocation = isElevatorGoingUp ? elevator.floorLocation++ : elevator.floorLocation--
                }, timeToPassOneFloor)
            })
        }
    }
}

export default new ControlRoom();