import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'UserMobileBrand.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export default class SQLiteDatabase {
  initDB() {
    let db;
    return new Promise(resolve => {
      //console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              console.log('db->', JSON.stringify(db));
              db.executeSql('SELECT 1 FROM UserDataList LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS UserDataList (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, country TEXT, mobile_number TEXT, fav_mobile_brand TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  getUsers() {
    return new Promise(resolve => {
      const user_list = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT id, name, country, mobile_number, fav_mobile_brand FROM UserDataList',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`ID: ${row.id}, Name: ${row.name}`);
                const {
                  id,
                  name,
                  country,
                  mobile_number,
                  fav_mobile_brand,
                } = row;
                user_list.push({
                  id,
                  name,
                  country,
                  mobile_number,
                  fav_mobile_brand,
                });
              }
              console.log(user_list);
              resolve(user_list);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  getFilteredUsers(selectedCountry, selectedMobileBrand) {
    var query = '';
    var dataArray = [];
    if (selectedCountry == '' && selectedMobileBrand != '') {
      query =
        'SELECT id, name, country, mobile_number, fav_mobile_brand FROM UserDataList WHERE fav_mobile_brand = ?';
      dataArray = [selectedMobileBrand];
    } else if (selectedMobileBrand == '' && selectedCountry != '') {
      query =
        'SELECT id, name, country, mobile_number, fav_mobile_brand FROM UserDataList WHERE country = ?';
      dataArray = [selectedCountry];
    } else if (selectedCountry != '' && selectedMobileBrand != '') {
      query =
        'SELECT id, name, country, mobile_number, fav_mobile_brand FROM UserDataList WHERE country = ? AND fav_mobile_brand = ?';
      dataArray = [selectedCountry, selectedMobileBrand];
    } else {
      query =
        'SELECT id, name, country, mobile_number, fav_mobile_brand FROM UserDataList';
    }
    console.log('query->',query, dataArray);
    return new Promise(resolve => {
      const user_list = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(query, dataArray).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`ID: ${row.id}, Name: ${row.name}`);
                const {
                  id,
                  name,
                  country,
                  mobile_number,
                  fav_mobile_brand,
                } = row;
                user_list.push({
                  id,
                  name,
                  country,
                  mobile_number,
                  fav_mobile_brand,
                });
              }
              console.log(user_list);
              resolve(user_list);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  addUser(user) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO UserDataList (name, country, mobile_number, fav_mobile_brand) VALUES (?, ?, ?, ?)',
              [
                user.name,
                user.country,
                user.mobile_number,
                user.fav_mobile_brand,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteUser(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM UserDataList WHERE id = ?', [id]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
