import { Room, RoomUser } from '../types/type';

class RoomController {
  private rooms: Room[] = [];

  public createRoom(user: RoomUser) {
    const newRoom: Room = {
      roomId: this.rooms.length,
      roomUsers: [user],
    };
    this.rooms.push(newRoom);
  }

  public getRooms() {
    return this.rooms;
  }
}

export const rooms = new RoomController();
