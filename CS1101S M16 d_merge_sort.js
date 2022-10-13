// Q1

function d_split_list(xs) {
    const len = length(xs);
    function helper(lst,i) {
        return i === 0
            ? lst
            : helper(tail(lst),i-1);
    }
    const lasthalf = helper(xs,math_ceil(len/2));
    let ys = xs;
    for (let i = 0; i<(len/2)-1;i=i+1) {
        ys = tail(ys);
    }
    set_tail(ys,null);

    return pair(xs,lasthalf);
    
}

// TEST:
const my_list1 = list(1, 2, 3, 4, 5, 6);
const my_list2 = list(5, 4, 3, 2, 1);
d_split_list(my_list1);
d_split_list(my_list2);

// Q2

function d_merge(xs, ys) {
    function swaptailofxsswithyss(xss,yss) {
        if (is_null(xss) || is_null(tail(xss))) {
            set_tail(xss,yss);
            return xs;
        }
        else if (head(tail(xss))<head(yss)) {
            return swaptailofxsswithyss(tail(xss),yss);
            
        } else {
            let temp = null;
            temp = tail(xss);
            set_tail(xss,yss);
            yss = temp;
            if (is_null(yss)) {
                return xs;
            } else {
                return swaptailofxsswithyss(tail(xss),yss);
            }
        }
    }
    if (head(xs)>head(ys)) {
        return d_merge(ys,xs);
    }
    return swaptailofxsswithyss(xs,ys);
}


// TEST:
// const my_list1 = list(2, 4, 5, 9);
// const my_list2 = list(3, 5, 8);
const my_list1 = list(1, 4, 5);
const my_list2 = list(2, 3, 9);
d_merge(my_list1, my_list2);

// Q3

function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const splited = d_split_list(xs);
        const first_half = head(splited);
        const last_half = tail(splited);
        return d_merge(d_merge_sort(first_half),d_merge_sort(last_half));

    }
}