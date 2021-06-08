/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { LibrosService } from './libros.service';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { Libros } from './interfaces/libros.interface';

@Controller('libros')
export class LibrosController {

  constructor(private librosService: LibrosService){}

  @Get() buscarLibros(): Libros[] {
    return this.librosService.listarLibros();
  }

  @Get(':id') infoLibro(@Param() params: any): string | Libros {
    const id: any = Number(params.id);
    if (!/\d/.test(id)) {
      return `El id: ${id} no es valido`;
    } else {
      return this.librosService.listarLibroById(id);
    }
  }

  @Post() crearLibro(@Body() infoLibro: CrearLibroDto): void {
    return this.librosService.crearLibro(infoLibro);
  }

  @Put(':id') editarLibro(@Param('id') id: number, @Body() actualizarLibro: CrearLibroDto): string | Libros {
    const dataLibro = {...actualizarLibro};
    const idLibro: any = Number(id);
    if (!/\d/.test(idLibro)) {
      return `El id: ${id} no es valido`;
    } else {
      return this.librosService.editarLibroById(idLibro, dataLibro);
    }
  }

  @Delete(':id') eliminarLibro(@Param('id') id: number): string {
    const idLibro: any = Number(id);
    if (!/\d/.test(idLibro)) {
      return `El id: ${id} no es valido`;
    } else {
      return this.librosService.eliminarLibro(idLibro);
    }
  }
}
