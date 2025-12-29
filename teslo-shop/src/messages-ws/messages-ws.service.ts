import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  public registerClient(client: Socket): void {
    this.connectedClients[client.id] = client;
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
}
