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