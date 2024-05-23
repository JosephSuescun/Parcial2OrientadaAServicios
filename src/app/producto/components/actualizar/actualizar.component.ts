import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ProductoInterface } from 'src/app/interface/producto-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private service: ServiceService) { }

  @Input() id: string = ""




  elemento: ProductoInterface = {
    id: this.id,
    title: "",
    price: 0,
    images: [],
    categoryId: "",
    description: "",
  }
  
  categories: any[] = [] ;

  ngOnInit(): void {
    this.service.getOne(this.id).subscribe(
      (res :any)=>{
        this.elemento = res;
        console.log(res)
      } ,
      (ERR :any)=> {
        console.log("error");
      },
      ()=>{
        console.log("111");
      }

    );


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

  updateItem() {
    console.log(this.id)
    Swal.fire({
      title: 'are you sure you want to update the product?',
      text: 'You cannot undo this afterwards',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel'
    }).then((result) => {

        this.service.putProducto(this.id, this.elemento).subscribe(
          (res: any) => {
            console.log('elemento actualizado')
         
            window.location.href = '/producto';
            
          },
          (ERR: any) => {
        
            console.log("error");
            console.log(ERR.message)
          },
          () => {
            console.log("finis");
          }
        );
      
    });

  }

  closeModal() {
    this.service.$modalInput.emit(false)
  }


}
