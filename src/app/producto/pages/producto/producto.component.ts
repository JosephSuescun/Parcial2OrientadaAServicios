import { ProductoInterface } from './../../../interface/producto-interface';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ListaComponent } from '../../components/lista/lista.component';
import { HeaderComponent } from 'src/app/public/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  public page: number = 0;
  public search: string = '';


  constructor(private service: ServiceService) { }

  @Input() id!: string;

  elemento: ProductoInterface = {
    id: '',
    title: '',
    price: 0,
    images: [],
    categoryId: '',
    description: '',
  };

  itemId!: string

  modalView!: boolean;

  modalDelete!: boolean;

  modalInput!: boolean;

  modalCreate!: boolean;

  public elementos: ProductoInterface[] = [];



  ngOnInit(): void {
    this.service.$modal.subscribe((valor) => {
      this.modalView = valor
    })

    this.service.$modalDelete.subscribe((valor) => {
      this.modalDelete = valor
    })

    this.service.$modalInput.subscribe((valor) => {
      this.modalInput = valor
    })
    this.service.$modalCreate.subscribe((valor) => {
      this.modalCreate = valor
    })

    this.service.getAll().subscribe(
      (res: any) => {
        this.elementos = res;
        console.log(res);
        res.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )
      },
      (_ERR: any) => {
        console.log("error");
      },
      () => {
        console.log("finis");
      }

    );

  }

  deleteItem(id: string) {
    this.itemId = id;
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
        this.service.deleteProducto(id).subscribe(
          (_res: any) => {
            console.log('Elemento eliminado');
            Swal.fire('Ok!',
              'Tu producto ha sido eliminado.',
              'success');
            window.location.href = '/producto';
          },
          (ERR: any) => {
            console.log('error', ERR);
            Swal.fire('Error al eliminar el producto.', '', 'error');
          },
          () => {
            console.log('finis');
          }
        );
      }
    });
  }

  openModalView(id: string) {
    this.itemId = id;
    this.modalView = true;
  }

  openModalDelete(id: string) {
    this.itemId = id
    this.modalDelete = true
  }

  openModalInput(id: string) {
    this.itemId = id
    this.modalInput = true
  }
  openModalCreate() {
    this.modalCreate = true
  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if (this.page > 0)
      this.page -= 5;
  }

  onSearchProducto(search: string) {
    this.page = 0;
    this.search = search;
  }



}
