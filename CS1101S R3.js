function my_sum(n) {
    return n === 0
           ? 0
           : (n+1) * n + my_sum(n-1);
}