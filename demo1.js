import {bb} from './demo';
// let C = bb
class A {
    constructor() {
        bb.hello=()=> {
            console.log("App");
        }
    }
}

let a = new A();