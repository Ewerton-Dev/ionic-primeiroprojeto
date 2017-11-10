import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class ServicosProvider {

  constructor(private dbProvider: DatabaseProvider) {}

  public getAll(){
    return this.dbProvider.getDB()
    .then((db : SQLiteObject) =>{
      let sql = 'select * from servicos';
      

      

      return db.executeSql(sql, [])
      .then((data: any) =>{
        if(data.rows.lenght > 0){
          let servicos: any[] = [];

          for (var i = 0; i < data.rows.length; i++) {
            var svc = data.rows.item(i);
            servicos.push(svc);
            
          }
          return servicos;
          
         } else{

        return [];
      }
        
      })
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

  }

}
