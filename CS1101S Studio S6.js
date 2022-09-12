// Q1

function my_map(f,xs) {
    return accumulate((x,y)=>pair(f(x),y),null,xs);
}

my_map(x=>x+1,list(1,2,3,4,5));

// Q2

function remove_duplicates(lst) {
    return is_null(lst)
        ? null
        : length(filter(x=>x===head(lst),lst))===1
            ? pair(head(lst),remove_duplicates(tail(lst)))
            : remove_duplicates(tail(lst));
}

length(filter(x=>x===head(list(2,1,1,1,1,1,111)),list(2,1,1,1,1,1,111)))===1;

remove_duplicates(list(2,1,2,1,1,1,111));

// Q3
/*
function makeup_ammout(x,coins) {
    if (x===0) {
        return list(null);
    } else if (x<0 || is_null(coins)) {
        return null;
    } else {
        x-head(coins)
    }
}
*/
function repeat_this_for_tail(remaining_amount,list) {
    function is_this_a_proper(proper_amount,proper_coins_left) {
        function make_all_even_failures(remaining_amount,remaining_coins_left) {
            return remaining_amount <= 0
                ? null
                : is_null(remaining_coins_left)
                    ? null
                    : remaining_amount - head(remaining_coins_left) < 0
                        ? make_all_even_failures(remaining_amount,tail(remaining_coins_left))
                        : remaining_amount - head(remaining_coins_left) === 0
                            ? pair(head(remaining_coins_left),null)
                            : pair(head(remaining_coins_left),make_all_even_failures(remaining_amount-head(remaining_coins_left),tail(remaining_coins_left)));
        }
        return (accumulate((x,y)=>x+y,0,make_all_even_failures(proper_amount,proper_coins_left)))===proper_amount
            ? make_all_even_failures(proper_amount,proper_coins_left)
            : null;
    }
    function removethenulls(lst) {
        return is_null(lst)
            ? null
            : is_null(head(lst))
                ? removethenulls(tail(lst))
                : pair(head(lst),removethenulls(tail(lst)));
    }
    const all_the_possible_combinations = is_null(list)
        ? null
        : pair(is_this_a_proper(remaining_amount,list),repeat_this_for_tail(remaining_amount,tail(list)));

    return removethenulls(all_the_possible_combinations);
}

//repeat_this_for_tail(22,list(1,10,5,20,1,5,1,50));


// Q1 inclass

function remove_duplicates1(list) {
    return accumulate((x,y)=>is_null(
                                    head(pair(is_null(filter(i=> i===x,y))?x:null,y)))?pair(head(y),tail(y)):pair(x,y),null,list);
}
remove_duplicates1(list(1,3,4,5,6,7,8,9,0));

// function remove_duplicates2(list) {
//     return pair(head(list),remove_duplicates2(accumulate((x,y)=>x!==head(list)?x:y,null,list)));
// }

// Q2 inclass

function subsets(xs) {
    is_null(xs)
        ? null
        : 
}