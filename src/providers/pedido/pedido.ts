import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class PedidoProvider {

  constructor(private dbProvider: DatabaseProvider) {}

  public insert (pedido: Pedido){
    return this.dbProvider.getDB()
      .then((db : SQLiteObject) =>{
        let sql = 'insert into pedido (nomecarro,placa,data,empresa, active, servico_id) values (?,?,?,?,?,?)';
        let data  = [pedido.nomecarro, pedido.placa, pedido.data, pedido.empresa, pedido.servico_id];
        return db.executeSql(sql, data)
        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));

  }
  public update (pedido: Pedido){
    return this.dbProvider.getDB()
      .then((db : SQLiteObject) =>{
        let sql = 'update pedido set nomecarro = ?, placa = ? ,data = ? ,empresa = ?, active = ? ,servico_id = ? where id = ?';
        let data  = [pedido.nomecarro, pedido.placa, pedido.data, pedido.empresa, pedido.active ? 1 : 0, pedido.servico_id, pedido.id];
        return db.executeSql(sql, data)
        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));

  }

  public remove (id: number){
    return this.dbProvider.getDB()
      .then((db : SQLiteObject) =>{
        let sql = 'delete from pedido where id = ?';
        let data  = [id];
        return db.executeSql(sql, data)
        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));

  }
  public get (id: number){
    return this.dbProvider.getDB()
      .then((db : SQLiteObject) =>{
        let sql = 'select * from pedido where id = ?';
        let data  = [id];
        return db.executeSql(sql, data)
        .then((data: any) =>{
          if(data.rows.lenght > 0){
          let item  = data.rows.item(0);
          let pedido = new Pedido();
          pedido.id = item.id;
          pedido.nomecarro = item.nomecarro;
          pedido.data = item.data;
          pedido.empresa = item.empresa;
          pedido.active = item.active;
          pedido.servico_id = item.servico_id;

        }
        return null;
        })
        .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));

  }

  public getAll(active:boolean, nomecarro: string = null){
    return this.dbProvider.getDB()
    .then((db : SQLiteObject) =>{
      let sql = 'select p.*, s.name as servico_name, price as preco_servico FROM pedido p inner join servicos on p.servico_id = s.id where p.active = ?';
      let data: any[] = [active ? 0 : 1];

      if(nomecarro){
        sql += 'and p.nomecarro like ?';
        data.push(name);
      }

      return db.executeSql(sql, data)
      .then((data: any) =>{
        if(data.rows.lenght > 0){
          let pedidos: any[] = [];

          for (var i = 0; i < data.rows.length; i++) {
            var pedido = data.rows.item(i);
            pedidos.push(pedido);
            
          }
          return pedidos;
          
         } else{

        
      }

      })
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

  }


}

export class Pedido{
  id: number;
  nomecarro: string;
  placa: string;
  data: Date;
  empresa: string;
  active: boolean;
  servico_id: number;


}
