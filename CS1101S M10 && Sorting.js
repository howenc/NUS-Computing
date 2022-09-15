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

// selection_sort

// put the first n elements of xs into a list
function take(xs, n) {
    return is_null(xs)
    ? null
    : n<=0
        ? null
        : pair(head(xs),take(tail(xs),n-1));
}

take(list(1,2,3,4,5,6,7,8,9,10),1);
// drop the first n elements from list, return rest

function drop(xs, n) {
    return is_null(xs)
    ? null
    : n<=0
    ? xs
    : drop(tail(xs),n-1);
}

drop(list(1,2,3,4,5,6,7,8,9,10),5);

function min(a, b) {
    return a < b ? a : b;
}

// given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
    function smallest_helper(smallest,xs) {
        const x = smallest < head(xs) ? smallest : head(xs);
        return is_null(tail(xs))
            ? x
            : smallest_helper(x,tail(xs));
    }
    return smallest_helper(head(xs),xs);
}

smallest(list(1,2,3,4,5,6,7,8,9,10,0));

function remove(x, xs) {
    return is_null(xs)
    ? null
    : is_null(x)
    ? pair(head(xs),remove(x,tail(xs)))
    : head(xs) === x
    ? remove(null,tail(xs))
    : pair(head(xs),remove(x,tail(xs)));
}

remove(2,list(1,2,2,2,3,4,5,7,8,9));

function selection_sort(xs) {
    if (is_null(xs)) {
        return null;
    } else {
        return is_null(tail(xs))
        ? pair(head(xs),null)
        : pair(smallest(xs),selection_sort((remove(smallest(xs),xs))));
    }
}

selection_sort(list(2,21,-100,100,10,9,6));

// Insert sort

function insert_cmp(x, xs, cmp) {
    return is_null(xs)
    ? list(x)
    : cmp(x, head(xs))
        ? pair(x, xs)
        : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}

function insertion_sort_cmp(xs, cmp) {
    return is_null(xs)
    ? xs
    : insert_cmp(head(xs),
                 insertion_sort_cmp(tail(xs), cmp),
                 cmp);
}
const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7);
insertion_sort_cmp(xs,(x,y)=>x<y);
insertion_sort_cmp(xs,(x,y)=>y<x);
insertion_sort_cmp(xs,(x,y)=>false);
// Merge sort