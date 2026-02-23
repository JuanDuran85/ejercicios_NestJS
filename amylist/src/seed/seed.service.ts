import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor() {}

  public async executeSeed(): Promise<boolean> {

    //1. Clean all the DB registers
    //2. Create users
    //3. Create items

    return true;
  }
}
