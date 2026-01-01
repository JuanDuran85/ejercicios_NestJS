import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

interface ConnectedClients {
  [id: string]: ConnectionObject;
}

interface ConnectionObject {
  socket: Socket;
  user: User;
}
@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async registerClient(client: Socket, userId: string) {
    const user: User | null = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) throw new Error('User not found');
    if (!user.isActive) throw new Error('User not active');

    this.checksConnection(user);

    this.connectedClients[client.id] = { socket: client, user };
    console.debug('Client connected: ', client.id);
  }

  public removeClient(clientId: string): void {
    delete this.connectedClients[clientId];
    console.debug('Client disconnected: ', clientId);
  }

  public getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  public getNumberOfClients(): number {
    return Object.keys(this.connectedClients).length;
  }

  public getUserFullName(socketId: string) {
    return this.connectedClients[socketId].user.fullName;
  }

  private checksConnection(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient: ConnectionObject = this.connectedClients[clientId];

      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}
