function change(x,new_value) {
    x = new_value;
    return x;
}

let y = 0;

//change(0,1);

function d_filter(pred,xs) {
    function helper(lst) {
        if (is_null(lst)) {
            return xs;
        } else if (pred(head(lst))) {
            xs = xs;
            return helper(tail(lst));
        } else {
            xs = remove(head(lst),xs);
            return helper(tail(lst));
        }
    }
    return helper(xs);
}

const L = list(1,2,3,4,5,6,7,8,9,11);

d_filter(x=> x%2 ===0,L);