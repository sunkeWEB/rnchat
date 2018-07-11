

class B{

    say () {
        console.log("-----------");
        this.hello();
    }

}

let b = new B();

b.hello = function () {
    console.log("1111111");
};
b.say();