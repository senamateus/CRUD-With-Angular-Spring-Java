import {Component,EventEmitter,inject,Input,Output,TemplateRef,ViewChild,} from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import {MdbModalModule,MdbModalRef,MdbModalService,} from 'mdb-angular-ui-kit/modal';
import { AcessoriosService } from '../../../services/acessorios.service';
import Swal from 'sweetalert2';
import { AcessoriosdetailsComponent } from '../acessoriosdetails/acessoriosdetails.component';

@Component({
  selector: 'app-acessorioslist',
  standalone: true,
  imports: [AcessoriosdetailsComponent, MdbModalModule],
  templateUrl: './acessorioslist.component.html',
  styleUrl: './acessorioslist.component.scss',
})
export class AcessorioslistComponent {
  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0, null);
  @Input('esconderBotoes') esconderBotoes: boolean = false;
  @Output('retorno') retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  acessorioService = inject(AcessoriosService);

  constructor() {
    this.findAll();

    let acessorioNovo = history.state.acessorioNovo;
    let acessorioEditado = history.state.acessorioEditado;

    if (acessorioEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == acessorioEditado.id;
      });
      this.lista[indice] = acessorioEditado;
    }

    if (acessorioNovo != null) {
      acessorioNovo.id = 555;
      this.lista.push(acessorioNovo);
    }
  }

  findAll() {
    this.acessorioService.findAll().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  deleteById(acessorio: Acessorio) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse acessório?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.acessorioService.delete(acessorio.id).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAll();
          },
          error: (erro) => {
            Swal.fire({
              title: 'Exclua primeiro esse acessório do carro que ele está vinculado',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }

  new() {
    this.acessorioEdit = new Acessorio(0, '');
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {
    this.findAll();
    this.modalRef.close();
  }

  select(acessorio: Acessorio) {
    this.retorno.emit(acessorio);
  }
}
