// Append 2 list together

function append(xs, ys) {
return is_null(xs)
? ys
: pair(head(xs), append(tail(xs), ys));
}

// Reverse the order of the lists using append

function reverse(lst) {
    return is_null(lst)
        ? null
        : append(reverse(tail(lst)), 
                list(head(lst)));
}

function reverse_iter(xs) {
    function rev(original, reversed) {
        return is_null(original)
            ? reversed
            : rev(tail(original),
                  pair(head(original), reversed));
    }
    return rev(xs, null);
}

// Accumulate for list

function accumulate(f,initial,xs) {
    return is_null(xs)
        ? initial
        : f(head(xs),accumulate(f,initial,tail(xs)));
}

function accumulate_for_tree(f,initial,tree) {
    return is_null(tree)
    ? initial
    : f( is_list(head(tree))
        ? accumulate_for_tree(f,initial,head(tree))
        : head(tree),
        accumulate_for_tree(f,initial,tail(tree)));
}

// traverse for list and trees

function traverse(xs) {
    if (is_null(xs)) {
        return null;
    } else {
        is_list(head(xs)) ? traverse(head(xs)) : display(head(xs));
        return traverse(tail(xs));
    }
}

// map

function map(f,xs) {
    return is_null(xs)
        ? null
        : pair(f(head(xs)),map(f,tail(xs)));
}

function map_tree(f,tree) {
    return is_null(tree)
        ? null
        : pair( is_list(head(tree))
            ? map_tree(f,head(tree))
            : f(head(tree))
            , map_tree(f,tail(tree)));
}

// flatten a tree by 1

function flatten_tree(xs) {
    return is_null(xs)
        ? null
        : is_list(head(xs))
            ? append(flatten_tree(head(xs)),flatten_tree(tail(xs)))
            : append(list(head(xs)) , flatten_tree(tail(xs)));
}

function count_data_items(tree) {
    return is_null(tree)
    ? 0
    : ( is_list(head(tree))
        ? count_data_items(head(tree))
        : 1 )
            +
        count_data_items(tail(tree));
}

function sum_data_items(tree) {
    return is_null(tree)
    ? 0
    : ( is_list(head(tree))
        ? sum_data_items(head(tree))
        : head(tree) )
            +
        sum_data_items(tail(tree));
}

function acc(f,initial,tree,c) {
    return is_null(tree)
    ? c(initial)
    : acc(f,initial,tail(tree),x=>c(f(((is_list(head(tree)))
                                    ? acc(f,initial,head(tree),c)
                                    : head(tree)),
                                    acc(f,initial,tail(tree),c)))); 
}

function accumulate_for_tree_iter(f,initial,tree) {
    return acc(f,initial,tree,x=>x);
}

function accumulate_tree(f,op,initial,tree) {
    return accumulate((x,ys)=>op(is_list(x)
                                ? accumulate_tree(f,op,initial,x)
                                : f(x)
                                ,accumulate_tree(f,op,initial,ys)),
                        initial,tree);
}

const my_tree = list(1,list(2,list(3,4),5),list(6,7));
const LoL = list(list(1,2),list(3,4,5,6),null,list(7,8,9));
const lit = list(1,2,3,4,5,6,7,8,9);
//accumulate((x,y)=>x+y,0,lit);
//accumulate_tree(x=>1,(x,y)=>x+y,0,my_tree);
flatten_tree(my_tree);
