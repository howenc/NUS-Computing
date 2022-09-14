function repeat(v,k) {
    return k<=0
        ? null
        : pair(v,repeat(v,k-1));
}

repeat(10,5);

function accumulate(f,initial,xs) {
    return is_null(xs)
        ? initial
        : f(head(xs),accumulate(f,initial,tail(xs)));
}

function expand_list(L,k) {
    return accumulate((x,y)=>append(repeat(x,k),y),null,L);
}

expand_list(list(7,8),3);