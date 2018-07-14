import React, {Component} from 'react';
import {
    ToastAndroid,
} from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(false);
let database_name = "";//数据库文件
let database_version = "1.0";//版本号
let database_displayname = "MySQLite";
let database_size = -1;//-1应该是表示无限制
let db;

export default class SQLite extends Component {
    constructor(props){
        if(!props)props={};
        super(props);
        // if(props.userId){
            database_name = "temp11_userSqliteDB_.db";
        // }

    }
    componentWillMount () {
        this.dropTable();
    }

    componentWillUnmount() {
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log("SQLiteStorage 没有打开");
        }
    }

    open() {
        //console.log("即将打开数据库:",database_name);
        if(!database_name)return false;
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                this._successCB('open');
            },
            (err) => {
                this._errorCB('open', err);
            });
        return db;
    }

    createTable() {
        if (!db) {
            this.open();
        }
        // this.dropTable();
        //创建用户表
        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS dicuser (id PRIMARY KEY,display,avatar,topic,lastmsg,lasttime,noread,roomid,type,roomInfo)`, [], () => {
                this._successCB('executeSql');
            }, (err) => {
                this._errorCB('executeSql', err);
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });

        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS dic_room (id PRIMARY KEY,display,icon,createUser,lastmsg,settings,lastTime,notRead,muted,saved)`, [], () => {
                this._successCB('executeSql');
            }, (err) => {
                this._errorCB('executeSql', err);
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });


        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS dic_room_contact (id PRIMARY KEY,user,exited,room)`, [], () => {
                this._successCB('executeSql');
            }, (err) => {
                this._errorCB('executeSql', err);
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });


        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS dic_room_record (id PRIMARY KEY,type,message,addTime,addUser,status,room,display,senduser)`, [], () => {
                this._successCB('executeSql');
            }, (err) => {
                this._errorCB('executeSql', err);
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });


        /**创建房间信息表 新增**/
        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS dic_room_info (id PRIMARY KEY,type,display,roomInfo)`, [], () => {
                this._successCB('executeSql');
            }, (err) => {
                this._errorCB('executeSql', err);
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });

    }

    deleteData() {
        if (!db) {
            this.open();
        }
        db.transaction((tx) => {
            // tx.executeSql('delete from user', [], () => {

            // });
        });
    }

    dropTable() {
        db.transaction((tx) => {
            tx.executeSql('drop table dicuser', [], () => {
            });
        }, (err) => {
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }

    insertUserData(sql, arr) {
        //console.log("------insertUserData------");
        //console.log(sql, arr);
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        db.transaction((tx) => {
            tx.executeSql(sql, arr, (e) => {
                    //console.log("eeeee",e);
                }, (err) => {
                    //console.log(err);
                }
            )
        }, (error) => {
            this._errorCB('transaction', error);
            ToastAndroid.show("数据插入失败", ToastAndroid.SHORT);
        }, () => {
            this._successCB('transaction insert data');
        });
    }

    update (sql) {
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        db.transaction((tx) => {
            tx.executeSql(sql, (e) => {
                    //console.log("eeeee",e);
                }, (err) => {
                    //console.log(err);
                }
            )
        }, (error) => {
            this._errorCB('transaction', error);
            ToastAndroid.show("更新数据失败", ToastAndroid.SHORT);
        }, () => {
            this._successCB('transaction insert data');
            ToastAndroid.show("更新数据成功", ToastAndroid.SHORT);
        });
    }

    updateUserData(sql, arr) {
        //console.log("------updateUserData------");
        //console.log(sql, arr);
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        db.transaction((tx) => {
            tx.executeSql(sql, arr, (e) => {
                    //console.log("eeeee",e);
                }, (err) => {
                    //console.log(err);
                }
            )
        }, (error) => {
            this._errorCB('transaction', error);
            ToastAndroid.show("数据更新失败", ToastAndroid.SHORT);
        }, () => {
            this._successCB('transaction insert data');
        });
    }


    close() {
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            //console.log("SQLiteStorage not open");
        }
        db = null;
    }

    _successCB(name) {
        //console.log("SQLiteStorage " + name + " success");
    }

    _errorCB(name, err) {
        //console.log("SQLiteStorage " + name);
        //console.log(err);
    }

    render() {
        return null;
    }
};