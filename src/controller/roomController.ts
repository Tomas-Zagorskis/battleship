import { Room, RoomUser } from '../types/type';

class RoomController {
  private rooms: Room[] = [];
  private index = 0;

  public createRoom(user: RoomUser) {
    const isUserInRoom = this.rooms.find(
      (room) => room.roomUsers[0]?.index === user.index,
    );

    if (isUserInRoom) throw new Error('You already created room');
    const newRoom: Room = {
      roomId: this.index,
      roomUsers: [user],
    };
    this.index++;
    this.rooms.push(newRoom);
  }

  public getRooms() {
    const availableRooms = this.rooms.filter(
      (room) => room.roomUsers.length === 1,
    );
    return availableRooms;
  }

  public joinToRoom(user: RoomUser, roomId: number) {
    const room = this.rooms.find((room) => room.roomId === roomId);
    if (room?.roomUsers[0]?.index === user.index) {
      throw new Error('You are already in this room');
    }
    if (room && room.roomUsers.length === 1) {
      room.roomUsers.push(user);
      this.rooms = this.rooms.filter(
        (room) => room.roomUsers[0]?.index !== user.index,
      );
      return room;
    }
  }
}

export const rooms = new RoomController();
