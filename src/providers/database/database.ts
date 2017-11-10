import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {}


    public getDB(){
      return this.sqlite.create({
        name: 'Eco10.db',
        location: 'default'
      
      });

    }
    public createDatabase(){
        return this.getDB()
        .then((db: SQLiteObject) => {

          this.createTables(db);
          this.insertDefaultItems(db);

        })
        .catch(e => console.error(e));
    }

    private createTables(db: SQLiteObject){

      db.sqlBatch([ 
        ['CREATE TABLE IF NOT EXISTS servicos (id integer primary Key AUTOINCREMENT NOT NULL, name TEXT, price REAL'],
        ['CREATE TABLE IF NOT EXISTS pedido (id integer primary Key AUTOINCREMENT NOT NULL, nomecarro TEXT, placa TEXT, data DATE, empresa TEXT, active boolean, servico_id integer, FOREIGN KEY(servico_id) REFERENCES servicos(id)) ']
      ])
        
      .then(() => console.log('Tabelas Criadas'))
      .catch(e => console.error('erro ao criar tabelas', e));

    }

    private insertDefaultItems(db: SQLiteObject){
      db.executeSql('select COUNT(id) as qtd from servicos', {})
      .then((data: any) => {
    
        if (data.rows.item(0).qtd == 0) {
    
          db.sqlBatch([
            ['insert into servicos (name, price) values (?)', ['Lavagem Complete'],['35.00']],
            ['insert into servicos (name, price) values (?)', ['enceramento'], ['60.00']]
          ])
          .then(() => console.log('Dados padrões incluidos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de servicos', e));
      }
    
    
   

    }
    
  

