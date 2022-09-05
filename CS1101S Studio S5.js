function listindexeven(store,lst) {
    return is_null(lst)
    ? lst
    : length(lst) % 2 === 1
        ? listindexeven(head(lst),tail(lst))
        : pair(head(lst),listindexeven(head(lst),tail(lst))); 
}

display(listindexeven(0,list(0,1,2,3,4,5,6,7,8,9)));

function listindexodd(store,lst) {
    return is_null(lst)
    ? lst
    : length(lst) % 2 === 0
        ? listindexodd(head(lst),tail(lst))
        : pair(head(lst),listindexodd(head(lst),tail(lst))); 
}

display(listindexodd(0,list(0,1,2,3,4,5,6,7,8,9)));

function sum(lst) {
    return is_null(lst)
    ? 0
    : head(lst) + sum(tail(lst));
}
sum(listindexodd(0,list(0,1,2,3,4,5,6,7,8,9)));
sum(listindexeven(0,list(0,1,2,3,4,5,6,7,8,9)));


/*

Other Solutions

function every_second_helper(lst, count) {
   return is_null(lst)
        ? lst
        : count % 2 === 0
            ? every_second_helper(tail(lst), (count + 1) % 2)
            : pair(head(lst), every_second_helper(tail(lst), (count + 1) % 2));
}

function every_second(lst) {
    return every_second_helper(lst, 0);
}

display(every_second(list(1)));
display(every_second(list(1,2)));
display(every_second(list(1,2,3,4,5,6,7,8)));

function sum(lst) {
    return is_null(lst)
        ? 0
        : head(lst) + sum(tail(lst));
}


function sums(lst) {
    return list(sum(every_second_helper(lst, 1)), sum(every_second_helper(lst, 0)));
}

sums(list(1, 2, 3, 4, 5));
//Value: [9, [6, null]]


function every_second1(list){
    return is_null(list) || is_null(tail(list)) 
    ? null 
    : pair(list_ref(list,1), every_second(tail(tail(list))));
}

function every_first(list){
    return is_null(list) || is_null(tail(list)) 
    ? null 
    : pair(list_ref(list,0), every_second(tail(tail(list))));
}

//every_second(list(1,2,3,4,5));


// function sums(input_list) {
//     const even_sum = get_even_sum(every_second,0);
//     const odd_sum = get_odd_sum(every_first,0);
//     return list(even_sum,odd_sum);
// }

// function get_sum(list,sum) {
//         return is_null(list) 
//         ? 0 
//         : is_null(tail(list)) 
//         ? sum + head(list)
//         : get_sum()
// }

// function get_even_sum(list,sum) {
//     return is_null(list) 
//         ? 0 
//         : is_null(tail(list)) 
//         ? head(list) % 2 === 0 
//             ?   sum+ head(list) 
//             : sum 
//         : head(list) % 2 === 0 
//             ? get_even_sum(tail(list), sum + head(list)) 
//             : get_even_sum(tail(list), sum);
// }

// function get_odd_sum(list,sum) {
//     return is_null(list) 
//     ? 0
//     : is_null(tail(list)) 
//     ? head(list) % 2 === 1 
//         ? sum+head(list) 
//         :sum
//     : head(list) % 2 === 1 
//         ? get_odd_sum(tail(list), sum + head(list)) 
//         : get_odd_sum(tail(list), sum);
// }


// sums(list(2,1,4,3,6));

*/


