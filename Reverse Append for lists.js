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

// Reverse the list by storing it in a parameter
function reversebetter(xs) {
    function rev(original, reversed) {
        return is_null(original)
            ? reversed
            : rev(tail(original),
                  pair(head(original), reversed));
    }
    return rev(xs, null);
}

// Accumulate

function accumulate(f,initial,xs) {
    return is_null(xs)
        ? initial
        : f(head(xs),accumulate(f,initial,tail(xs)));
}

// traverse

function traverse(xs) {
    // Modify this function to work on trees.
    if (is_null(xs)) {
        return null;
    } else {
        is_list(head(xs)) ? traverse(head(xs)) : display(head(xs));
        return traverse(tail(xs));
    }
}

function flatten_tree(xs) {
    return is_null(xs)
        ? null
        : is_list(head(xs))
            ? accumulate(head(xs),null,tail(xs))
            : pair(head(xs),flatten_tree(tail(xs)));
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

function accumulate_for_tree(f,initial,tree) {
    return is_null(tree)
    ? initial
    : f( is_list(head(tree))
        ? sum_data_items(head(tree))
        : head(tree),
        sum_data_items(tail(tree)));
}

const my_tree = list(1,list(2,list(3,4),5),list(6,7));

accumulate_for_tree((x,y)=>x+y,0,my_tree);