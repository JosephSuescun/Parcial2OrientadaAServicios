import { Component, Input } from '@angular/core';
import { ProductoInterface } from 'src/app/interface/producto-interface';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent {

  constructor(private service: ServiceService) {}

  @Input() id!: string;

  elemento: ProductoInterface = {
    id: '',
    title: '',
    price: 0,
    images: [],
    categoryId: '',
    description: '',
  };

  deleteItem() {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este producto?',
      text: 'No podrás recuperar este producto una vez eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteProducto(this.id).subscribe(
          (res: any) => {
            console.log('Elemento eliminado');
            Swal.fire('¡Producto eliminado!', '', 'success');
            window.location.href = '/producto';
          },
          (ERR: any) => {
            console.log('error', ERR);
            Swal.fire('Error al eliminar el producto.', '', 'error');
            window.location.href = '/producto';
          },
          () => {
            console.log('finis');
          }
        );
      }
    });
  }

  closeModal() {
    this.service.$modalDelete.emit(false);
  }
}
