import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { ListaComponent } from './components/lista/lista.component';
import { CrearComponent } from './components/crear/crear.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { HeaderComponent } from '../public/header/header.component';
import { FormsModule } from '@angular/forms';
import { FiltroPipe } from './pipes/filtro.pipe';

@NgModule({
  declarations: [
    ProductoComponent,
    ListaComponent,
    CrearComponent,
    ActualizarComponent,
    EliminarComponent,
    HeaderComponent,
    FiltroPipe
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    NgOptimizedImage,
    FormsModule
  ]
})
export class ProductoModule { }
