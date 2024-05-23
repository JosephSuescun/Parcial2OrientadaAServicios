import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ProductoInterface } from 'src/app/interface/producto-interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  

  constructor(private service : ServiceService){}

  @Input() id : string = ""

  elemento : ProductoInterface = {
    id: "",
    title: "",
    price: 0,
    images : [],
    categoryId: "",
    description : "",
  }
  
  ngOnChanges(){
    console.log("1");
  }

  ngOnInit(): void {
    this.service.getOne(this.id).subscribe(
      (res :any)=>{
        this.elemento = res;
        console.log(res)
        res.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )
        
      } ,
      (ERR :any)=> {
        console.log("error");
      },
      ()=>{
        console.log("finis");
      }

    );
  }

  closeModal() {
    this.service.$modal.emit(false)
  }



}
