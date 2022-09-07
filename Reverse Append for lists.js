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

function flatten_list(xs) {
    return is_null(xs)
        ? null
        : is_list(head(xs))
            ? accumulate((x,y)=>append(x,y),null,xs)
            : pair(head(xs),flatten_list(tail(xs)));
}

const my_tree = list(1,list(2,list(3,4),5),list(6,7));
const LoL = list(list(1,2),list(3,4,5,6),null,list(7,8,9));
flatten_list(my_tree);
