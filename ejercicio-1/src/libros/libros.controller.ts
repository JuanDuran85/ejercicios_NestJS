import { Controller, Get, Param } from '@nestjs/common';

@Controller('libros')
export class LibrosController {
  @Get() buscarLibros(): string {
    return 'Aqui se listaran todos los libros';
  }
  @Get(':id') infoLibro(@Param() params): string {
    return `El parametro es: ${params.id}`;
  }
}
