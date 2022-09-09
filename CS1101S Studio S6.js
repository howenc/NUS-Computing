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

function makeup_ammout(x,coins) {
    if (x===0) {
        return list(null);
    } else if (x<0 || is_null(coins)) {
        return null;
    } else {
        x-head(coins)
    }
}

function nCr(list_of_coins, how_many_coins_are_being_used) {
    return length(list_of_coins)<how_many_coins_are_being_used // Change this condition.
           ? null
           : (r===0) // Change this condition.
	       ? head(list_of_coins)
           // Inductive case goes here.
           : nCr(n-1,how_many_coins_are_being_used-1) + nCr(n-1,how_many_coins_are_being_used);
}