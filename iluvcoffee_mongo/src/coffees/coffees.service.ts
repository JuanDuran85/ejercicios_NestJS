import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Event } from '../events';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  public findAll(paginationQuery: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  public create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  public async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) throw new NotFoundException(`Coffee #${id} not found`);
    return existingCoffee;
  }

  public async remove(id: string) {
    const resultDelete = await this.coffeeModel.findOneAndDelete({ _id: id });
    if (!resultDelete) throw new NotFoundException(`Coffee #${id} not found`);
    return resultDelete;
  }

  public async recommendCoffee(coffee: Coffee) {
    const session: ClientSession = await this.connection.startSession();
    session.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee._id },
      });
      await recommendEvent.save({ session });
      await coffee.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.error(String(error));
    } finally {
      session.endSession();
    }
  }
}
