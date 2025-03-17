import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Marca } from '../../../models/marca';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [MarcasdetailsComponent, MdbModalModule],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0, null);

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output('retorno') retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe !: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  marcaService = inject(MarcaService);
  

  constructor() {
      this.findAll();
  
      let marcaNovo = history.state.marcaNovo;
      let marcaEditado = history.state.marcaEditado;
  
      if (marcaEditado != null) {
        let indice = this.lista.findIndex((x) => {
          return x.id == marcaEditado.id;
        });
        this.lista[indice] = marcaEditado;
      }
  
      if (marcaNovo != null) {
        marcaNovo.id = 555;
        this.lista.push(marcaNovo);
      }
    }
  
    findAll(){
      this.marcaService.findAll().subscribe({
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
  
    deleteById(marca: Marca) {
      Swal.fire({
        title: 'tem certeza que deseja deletar essa marca?',
        icon: 'warning',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then((result) => {
        if (result.isConfirmed) {
  
          this.marcaService.delete(marca.id).subscribe({
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
      this.marcaEdit = new Marca(0, "");
      this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
    }
  
    edit(marca: Marca){
      this.marcaEdit = Object.assign({}, marca);
      this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
    }
  
    retornoDetalhe(marca : Marca){
      this.findAll();
      this.modalRef.close();
    }

    select(marca: Marca){
      this.retorno.emit(marca);
    }
}
