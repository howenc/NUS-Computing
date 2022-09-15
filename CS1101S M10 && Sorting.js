// Q1

function partition(xs, p) {
    function smaller_than_p(xs,p) {
        return is_null(xs)
            ? xs
            : head(xs)<=p
                ? pair(head(xs),smaller_than_p(tail(xs),p))
                : smaller_than_p(tail(xs),p);
    }
    function bigger_than_p(xs,p) {
        return is_null(xs)
            ? xs
            : head(xs)>p
                ? pair(head(xs),bigger_than_p(tail(xs),p))
                : bigger_than_p(tail(xs),p);
    }
    return pair(smaller_than_p(xs,p),bigger_than_p(xs,p));
}

// Test
const my_list = list(1, 2, 3, 4, 5, 6);
 partition(my_list, 4);

// Q2

function quicksort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else { const full = partition(tail(xs),head(xs));
             const fronthalf = head(full);
             const backhalf = tail(full);
            return append(quicksort(fronthalf),pair(head(xs),quicksort(backhalf)));
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0,-10,29,4820,-3089);
quicksort(my_list);

