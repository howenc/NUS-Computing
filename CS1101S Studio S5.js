// Q1

function every_second_helper(lst,index) {
    return is_null(lst)
        ? lst    
        : index % 2 === 0
            ? head(lst)
            : pair(head(lst),every_second_helper(tail(tail(lst)), index-2))
;    
}

every_second_helper(list(1,2,3,4,5),1);

function every_second(list){
    return is_null(list) || is_null(tail(list)) 
    ? null 
    : pair(list_ref(list,1), every_second(tail(tail(list))));
}

function every_second_helper1(lst, count) {
   return is_null(lst)
       ? lst
       : count % 2 === 0
           ? every_second_helper(tail(lst), (count + 1) % 2)
           : pair(head(lst), every_second_helper(tail(lst), (count + 1) % 2));
}

function every_second1(lst) {
    return every_second_helper(lst, 0);
}



function sum(lst) {
    return is_null(lst)
        ? 0
        : head(lst) + sum(tail(lst));
}


function sums(lst) {
    return list(sum(every_second_helper(lst, 1)), sum(every_second_helper(lst, 0)));
}

sums(list(1, 2, 3, 4, 5));
Value: [9, [6, null]]


function every_second(list){
    return is_null(list) || is_null(tail(list)) 
    ? null 
    : pair(list_ref(list,1), every_second(tail(tail(list))));
}

function every_first(list){
    return is_null(list) || is_null(tail(list)) 
    ? null 
    : pair(list_ref(list,0), every_second(tail(tail(list))));
}