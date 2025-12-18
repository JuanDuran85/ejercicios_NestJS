import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: Date.now(),
    },
  ];

  public create(createBrandDto: CreateBrandDto): Brand {
    const { name } = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: Date.now(),
    };
    this.brands.push(brand);
    return brand;
  }

  public findAll(): Brand[] {
    return this.brands;
  }

  public findOne(id: string): Brand {
    const brand: Brand | undefined = this.brands.find(
      (brand) => brand.id === id,
    );
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  public update(id: string, updateBrandDto: UpdateBrandDto): Brand {
    let brandDb: Brand = this.findOne(id);

    this.brands = this.brands.map((brand: Brand) => {
      if (brand.id === id) {
        brandDb.updatedAt = Date.now();
        brandDb = { ...brandDb, ...updateBrandDto };
        return brandDb;
      }
      return brand;
    });
    return brandDb;
  }

  public remove(id: string): string {
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return `This action remove the brand with id: #${id}`;
  }

  public fillBrandsWithSeedData(brands: Brand[]): void {
    this.brands = brands;
  }
}
