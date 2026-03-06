import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BasicReportsService {
    constructor(private readonly prisma: PrismaService){

    }
   public async getBasicReport() {
        return this.prisma.employees.findMany();
    }
}
