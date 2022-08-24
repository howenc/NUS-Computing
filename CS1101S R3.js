function my_sum(n) {
    return n === 0
           ? 0
           : (n+1) * n + my_sum(n-1);
}

function sum(term, a, next, b) {
    return a > b
       ? 0
       : term(a) + sum(term, next(a), next, b);
}

function my_sum1(n) {
    return sum(a=>((a+1) * a),1, a=>a+1,n);
}

function sumiter(store, term, a, next, b) {
    return a > b
       ? store
       : sumiter(term(a) + store, term, next(a), next, b);
}

function f(g) {
    const x = 3;
    return x=> x+g(x);
}

function g(f,y) {
    const h = (y,f) => y(f);
    return h(f,y);
}