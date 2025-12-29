import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesWsService: MessagesWsService) {}

  public handleDisconnect(client: Socket): void {
    this.messagesWsService.removeClient(client.id);
    console.debug(
      `Connected Clients: ${this.messagesWsService.getNumberOfClients()}`,
    );
  }
  public handleConnection(client: Socket): void {
    this.messagesWsService.registerClient(client);
    console.debug(
      `Connected Clients: ${this.messagesWsService.getNumberOfClients()}`,
    );
  }
}
