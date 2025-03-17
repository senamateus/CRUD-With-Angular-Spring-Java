import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import Swal from 'sweetalert2';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal'
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CarroService } from '../../../services/carro.service';
import { Marca } from '../../../models/marca';
import { Acessorio } from '../../../models/acessorio';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [/*RouterLink*/ CarrosdetailsComponent, MdbModalModule],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss',
})
export class CarroslistComponent {
  lista: Carro[] = [];
  marcaPadrao: Marca = new Marca(0, null);
  carroEdit: Carro = new Carro(0, "", null, null);
   

  //Elementos da MODAL
  modalService = inject(MdbModalService);
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);
  acessorio: any;

  constructor() {
    this.findAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == carroEditado.id;
      });
      this.lista[indice] = carroEditado;
    }

    if (carroNovo != null) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }
  }

  findAll(){
    this.carroService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'tem certeza que deseja deletar esse veículo?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {

        this.carroService.delete(carro.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAll();
          },
          error: erro => {
            Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });

      }
    });
  }

  new(){
    this.carroEdit = new Carro(0, "", null, null);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro : Carro){
    this.findAll();
    this.modalRef.close();
  }

  
}
