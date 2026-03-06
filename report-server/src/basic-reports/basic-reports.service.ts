import { Injectable } from '@nestjs/common';

@Injectable()
export class BasicReportsService {
  constructor() {}

  public async getBasicReports() {
    return 'Report test one';
  }
}
