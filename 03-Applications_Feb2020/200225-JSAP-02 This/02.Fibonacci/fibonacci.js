function getFibonator(){
    let previousFib = 0;
    let nextFib = 1;

    function fib(){
        [nextFib, previousFib] = [nextFib + previousFib , nextFib];
        return previousFib;
    }

    return fib;
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13

