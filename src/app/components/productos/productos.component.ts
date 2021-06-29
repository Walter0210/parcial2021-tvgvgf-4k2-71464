import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosServiceService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Titulo = 'Producots';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)'
  };
  AccionABMC = 'L';
  Items: Producto[] = null;
  submitted: boolean = false;

  constructor(private productoService: ProductosServiceService) {}

  ngOnInit() {}

  GetProductos() {
    this.productoService.get().subscribe((res: Producto[]) => {
      this.Items = res;
    });
  }
}
