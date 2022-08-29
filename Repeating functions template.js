function compose(f, g){
return x => f(g(x));
}

function repeated(f, n) {
return n === 0
? x => x
: compose(f, repeated(f, n - 1));
}
