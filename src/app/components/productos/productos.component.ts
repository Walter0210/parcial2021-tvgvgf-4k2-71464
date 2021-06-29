import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosServiceService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Titulo = 'Productos';
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
  FormAlta: FormGroup;

  constructor(
    private productoService: ProductosServiceService,
    private modalDialogService: ModalDialogService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.FormAlta = this.formBuilder.group({
      ProductoID: [0],
      ProductoNombre: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
      ],
      ProductoStock: [
        null,
        [Validators.required, Validators.pattern('^\\d{1,10}$')]
      ],
      ProductoFechaAlta: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ]
    });

    this.GetProductos();
  }

  GetProductos() {
    this.productoService.get().subscribe((res: Producto[]) => {
      this.Items = res;
    });
  }

  Grabar() {}

  Volver() {
    this.AccionABMC = 'L';
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormAlta.reset({ ProductoID: 0 });
    this.submitted = false;
    this.FormAlta.markAsUntouched();
  }
}
