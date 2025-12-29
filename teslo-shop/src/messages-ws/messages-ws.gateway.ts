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

  public handleDisconnect(client: Socket) {
    console.debug('Client disconnected: ', client.id);
  }
  public handleConnection(client: Socket) {
    console.debug('Connection established: ', client.id);
  }
}
