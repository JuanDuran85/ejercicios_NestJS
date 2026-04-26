interface UpdateWithOptions {
  name?: string;
  description?: string;
  price?: number;
}

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;

  constructor(id: string, name: string, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  public updateWith({ name, description, price }: UpdateWithOptions): void {
    this.name = name ?? this.name;
    this.description = description ?? this.description;
    this.price = price ?? this.price;
  }
}
