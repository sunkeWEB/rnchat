class A {
    constructor () {
        setTimeout(() =>
                this.mm()
            , 2000);
    }
    mm () {
        this['hello']();
    }
}

class B{
    controlFilter = new A();
    constructor () {
        this.controlFilter.hello=function () {
            console.log("外面的hello");
        }
    }
}

export let bb = new B();