import { Pipe, PipeTransform } from '@angular/core';
import { ProductoInterface } from 'src/app/interface/producto-interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(elementos: ProductoInterface[], page: number = 0, search: string = ''): ProductoInterface[] {


    if (search.length === 0)
      return elementos.slice(page, page + 8);

    const filteredProducto = elementos.filter(elemento => elemento.title.includes(search));
    console.log(filteredProducto);
    return filteredProducto.slice(page, page + 8);

  }

}
