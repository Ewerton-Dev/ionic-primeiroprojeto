import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { PedidoProvider, Pedido } from '../../providers/pedido/pedido';



@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
  providers:[
    MoovieProvider
  ]
})
export class CardsPage {
  public lista_filmes = new Array<any>();
  datas:any = [];

  pedidos: any[] = [];
  onlyInactives: boolean=false;
  searchText: string = null;
  

  constructor(public navCtrl: NavController, private toast: ToastController, private PedidoProvider: PedidoProvider){}

  ionViewDidEnter(){
    this.getAllPedidos();    
  }

  
  getAllPedidos(){
    this.PedidoProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) =>{
        this.pedidos = result;
      });
  }

  addPedido(){
    this.navCtrl.push('EditPedidoPage');
  }
  editPedido(id: number){
    this.navCtrl.push('EditPedidoPage', { id: id });
  }
 
  removePedido(pedido: Pedido){
    this.PedidoProvider.remove(pedido.id);
    var index = this.pedidos.indexOf(pedido);
    this.pedidos.splice(index, 1);
    this.toast.create({ message: 'Pedido removido.', duration:3000, position:'botton'}).present();
  }

  filterPedidos(ev: any){
    this.getAllPedidos();
  }

}
