/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Libros } from './interfaces/libros.interface';

@Injectable()
export class LibrosService {
    private readonly _libros: Libros[] = [
        {
            libro_id: 19272,
            nombre: 'Investor',
            autor: 'Hattie Hoppe',
            paginas: 123
        },
        {
            libro_id: 70947,
            nombre: 'BMW',
            autor: 'Jeffrey Reichert',
            paginas: 67
        },
        {
            libro_id: 19084,
            nombre: 'Maserati',
            autor: 'Steve Rolfson',
            paginas: 987
        },
    ];
    
    //una funcion para crear libros
    crearLibro(infoLibro: any):void {
        console.log(infoLibro);
        const nuevoLibro: Libros = {
            libro_id: this.addID(),
            ...infoLibro
        };
        this._libros.push(nuevoLibro);
    }
    
    //id aleatroio
    addID(): number {
        let lastId: number;
        if (this._libros.length > 0) {
            lastId = this._libros[this._libros.length - 1].libro_id + 1;
            return lastId;
        } else {
            return lastId = 1;
        }
    }

    //una funcion para consultar todos los libros
    listarLibros():Libros[]{
        return this._libros;
    }

    //una funcion para consultar un libro por id
    listarLibroById(id:number):Libros | string{
        return this._libros.find(libro => libro.libro_id === id) || `No existe el libro para el id: ${id}`;
    }
  
    //encontrar un libro por id
    findIndexLibro(id:number): number | string {
        const result: any = this._libros.findIndex(libro => libro.libro_id === id);
        return result >=0 ? result : `No existe el libro para el id: ${id}`;
    }
    
    //una funcion para editar un libro por id
    editarLibroById(id: number, dataLibro: any): Libros{
        const indice: any = this.findIndexLibro(id);
        if (indice >= 0) {
            const { libro_id, } = this._libros[indice];
            this._libros[indice] = {
                libro_id,
                nombre: dataLibro.nombre ? dataLibro.nombre : '',
                autor: dataLibro.autor ? dataLibro.autor : '',
                paginas: dataLibro.paginas ? dataLibro.paginas : ''
            }
            return this._libros[indice];
        } else {
            return indice;
        };
    }

    //una funcion para eliminar un libro por id
    eliminarLibro(id: number): string {
        const indice: any = this.findIndexLibro(id);
        if (indice >= 0) {
            this._libros.splice(indice,1);
            return `El libro fue eliminado correctamente`;
        } else {
            return indice;
        };
    }
}
