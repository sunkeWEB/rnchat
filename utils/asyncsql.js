import SQLite from './sqlite';
import {AppRegistry} from 'react-native';
AppRegistry.registerHeadlessTask('SomeTaskName', () => require('./sqlite'));
let sqLite = null;
let db;

// initDataBase();

export function initDataBase(config={}) {
    sqLite = new SQLite(config);

    //开启数据库

    if (sqLite) {
        db = sqLite.open();
        if(!db)return false;
    }
    // jconfig.sqliteOpenend = true;

    //建表
    // sqLite.dropTable();
    sqLite.createTable();
    // //删除数据
    sqLite.deleteData();

    return true;
}

export function read(sql, arr = []) {
    return new Promise((s1, s2) => {
        db.transaction((tx) => {
            tx.executeSql(sql, arr, (tx, results) => {
                let len = results.rows.length;
                let arr = [];
                for (let i = 0; i < len; i++) {
                    let u = results.rows.item(i);
                    arr.push(u);
                }
                s1(arr);
            });
        }, (error) => {//打印异常信息
            //console.log("132465ERROR"+error);
            s2(error);
        });
    })
}

export function insert(sql, arr) {
    sqLite.insertUserData(sql, arr);
}

export function updateChat(sql) {
    return new Promise((s1, s2) => {
        sqLite.update(sql);
        s1("更新数据成功");
    })
}

export function updateUserDatas(sql, arr) {
    return  sqLite.updateUserData(sql, arr);
}