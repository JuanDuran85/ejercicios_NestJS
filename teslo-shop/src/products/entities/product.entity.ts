import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ProductImage } from './product-image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '974dd50b-c742-44f4-8ebd-4407c9e46b77',
    description: 'Product Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
    default: null,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product slug',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;
  
  @ApiProperty({
    example: 10,
    description: 'Product stock',
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product sizes',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['Shirt', 'Pants'],
    description: 'Product tags',
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ManyToOne(() => User, (user: User) => user.product, {
    eager: true,
  })
  user: User;

  @OneToMany(
    () => ProductImage,
    (productImage: ProductImage) => productImage.product,
    {
      cascade: true,
      eager: true,
    },
  )
  images?: ProductImage[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll('-', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (this.slug) {
      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll('-', '_')
        .replaceAll("'", '');
    }
  }
}
