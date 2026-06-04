import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../presenters/http/dto/create-alarm.dto';
import { UpdateAlarmDto } from '../presenters/http/dto/update-alarm.dto';

@Injectable()
export class AlarmsService {
  public create(createAlarmDto: CreateAlarmDto) {
    return 'This action adds a new alarm';
  }

  public findAll() {
    return `This action returns all alarms`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} alarm`;
  }

  public update(id: number, updateAlarmDto: UpdateAlarmDto) {
    return `This action updates a #${id} alarm`;
  }

  public remove(id: number) {
    return `This action removes a #${id} alarm`;
  }
}
