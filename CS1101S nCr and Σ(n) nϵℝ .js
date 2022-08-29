function nCr(n, r) {
    return (n<r) // Change this condition.
           ? 0
           : (r===0) // Change this condition.
	       ? 1
           // Inductive case goes here.
           : nCr(n-1,r-1) + nCr(n-1,r);
}

function sum(term, a, next, b) {
    return a > b
       ? 0
       : term(a) + sum(term, next(a), next, b);
}

function sum_odd(n) {
    return sum(a=>a, 1, a=>a+2, 2*n);
}

function sum_odd_lte(n) {
    return sum(a=>a, 1, a=>a+2, n);
}


{
function accumulate(combiner, term, a, next, b, base) {
    return a > b
       ? base
       : combiner(term(a), accumulate(combiner, term, next(a), next, b, base));
}

// Example uses:

// function sum(term, a, next, b) {
//   return accumulate( (x, y) => x + y, term, a, next, b, 0);
// }

// function product(term, a, next, b) {
//   return accumulate( (x, y) => x * y, term, a, next, b, 1);
// }

// function fact(n) {
//     return product(x => x, 1, x => x + 1, n);
// }
}

function my_sum(n) {
    return n === 0
           ? 0
           : (n+1) * n + my_sum(n-1);
}


function compose(f, g){
return x => f(g(x));
}

function repeated(f, n) {
return n === 0
? x => x
: compose(f, repeated(f, n - 1));
}
