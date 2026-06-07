import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities';

@Injectable()
export class AuthenticationService {


    constructor(
        @InjectRepository(User)
    ){}

}
