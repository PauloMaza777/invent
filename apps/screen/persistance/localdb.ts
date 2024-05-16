import SQLite from 'react-native-sqlite-storage';

export default class LocalDB {
  static async connect() {
    return SQLite.openDatabase({ name: 'inventario' });
  }
  static async init() {
    const db = await LocalDB.connect();
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS productos (
        id              INTEGER         PRIMARY KEY         AUTOINCREMENT,
        nombre          VARCHAR(64)     NOT NULL,        
        precio          DECIMAL(10,2)   NOT NULL        DEFAULT '0.0', 
        minStock        INTEGER         NOT NULL        DEFAULT 0,
        currentStock    INTEGER         NOT NULL        DEFAULT 0,
        maxStock        INTEGER         NOT NULL        DEFAULT 0
      );`,
        [],
        () => console.log('CREATED TABLE productos'),
        error => console.error({ error }),
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Movimientos (
        id              INTEGER         PRIMARY KEY         AUTOINCREMENT,
        fk_producto     INTEGER         NOT NULL,
        creado          DATETIME        NOT NULL,
        cantidad        INTEGER        NOT NULL
        
      );`,
        [],
        () => console.log('CREATED TABLE Movimientos'),
        error => console.error({ error }),
      );
    });
  }


  static async registerProducto({ nombre, maxStock, minStock, precio }: { nombre: string, precio: number, minStock: number, maxStock: number }) {
    try {
      const db = await LocalDB.connect();
      await db.executeSql(
        'INSERT INTO productos (nombre, precio, minStock, currentStock, maxStock) VALUES (?, ?, ?, 0, ?)',
        [nombre, precio, minStock, maxStock],
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  static async addMOvimiento({ producto, cantidad }: { cantidad: number, producto: number }) {
    try {
      const db = await LocalDB.connect();
      var res = await db.executeSql(
        'INSERT INTO Movimientos (fk_producto, creado, cantidad) VALUES (?, ?, ?)',
        [producto, Date.now(), cantidad],
      );
      console.log(res);




      var res2 = await db.executeSql(
        'UPDATE productos SET currentStock = currentStock + ? WHERE id = ?',
        [cantidad, producto],
      );

      console.log(res2);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
