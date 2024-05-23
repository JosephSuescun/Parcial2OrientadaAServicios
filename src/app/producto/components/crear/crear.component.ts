import { ProductoInterface } from 'src/app/interface/producto-interface';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit, OnDestroy, OnChanges {

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

  categories: any[] = [] ;

  ngOnInit(): void {

    this.service.getCategories().subscribe(
      (res: any) => {
        this.categories = res;
        console.log(this.categories);
      },
      (err: any) => {
        console.log("error fetching categories");
      }
    );
  }

  ngOnChanges(): void {
    console.log() 
  }


  ngOnDestroy(): void {
    console.log() 
  }

  createItem() {
    Swal.fire({
      title: 'Are you sure you want to create a new product?',
      text: 'The product will be created and will be added to the database',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.postProducto(this.elemento).subscribe(
          (res: any) => {
            console.log('Elemento creado');
            Swal.fire('¡Producto creado!', '', 'success');
            window.location.href = '/producto';
          },
          (ERR: any) => {
            console.log('error');
            console.log(ERR.message);
            Swal.fire('Error al crear el producto.', '', 'error');
          },
          () => {
            console.log('finis');
          }
        );
      }
    });
  }

  closeModal() {
    this.service.$modalCreate.emit(false);
  }
}
