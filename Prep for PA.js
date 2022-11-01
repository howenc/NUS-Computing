// prep for PA

function is_nucleobase(string) {
    return string === 'A' || string === 'C' || string === 'G' || string === 'T';
}

function is_dna_strand(list_of_bases) {
    function helper(lst) {
        return is_null(lst)
                ? true
                : is_nucleobase(head(lst))
                    ? helper(tail(lst))
                    : false;
    }
    return helper(list_of_bases); 
}

function combine(list_of_strands) {
    return accumulate(append,null,list_of_strands);
}

function oxoguanine_repair(list_of_bases) {
    return map(x=>x==='8' ? 'G'
                          : x
                            ,list_of_bases);
}


function find_gene_start(list_of_strand) {
    if (is_null(list_of_strand)) {
        return null;
    } else if (head(list_of_strand) === 'A') {
        if(head(tail(list_of_strand)) === 'T') {
            if (head(tail(tail(list_of_strand))) === 'G') {
                return list(tail(tail(tail(list_of_strand))));
            } else {
                return find_gene_start(tail(tail(tail(list_of_strand))));
            }
        } else {
            return find_gene_start(tail(tail(list_of_strand)));
        }
    } else {
        return find_gene_start(tail(list_of_strand));
    }
}

function find_gene_end(list_of_strand) {
    return head(find_gene_end_2(list_of_strand));
}

function find_gene_end_2(list_of_strand) {
    function take(xs,number) {
        return number < 1
                ? null
                : pair(head(xs),take(tail(xs),number -1));
    }
    function drop(xs,number) {
        return number+3 < 1
                ? xs
                : drop(tail(xs),number -1);
    }
    function helper(lst,index) {
        if (is_null(lst)) {
            return null;
        } else if (display(head(lst)) === 'T') {
            if (head(tail(lst)) === 'A') {
                if (head(tail(tail(lst))) === 'G' || head(tail(tail(lst))) === 'A') {
                    return pair(take(list_of_strand,index),drop(list_of_strand,index));
                } else {
                    return helper(tail(lst),index+1);
                }
            } else if (head(tail(lst)) === 'G') {
                if (head(tail(tail(lst))) === 'A') {
                    return pair(take(list_of_strand,index),drop(list_of_strand,index));
                } else {
                    return helper(tail(lst), index +1);
                }
            } else {
                return helper(tail(lst), index+1);
            }
        } else {
             return helper(tail(lst), index+1);
        }
    }    
    return is_null(list_of_strand)
            ? null
            : helper(list_of_strand,0);
}

function all_genes(list_of_strand) {
    const temp_1 = find_gene_start(list_of_strand);
    if (is_null(list_of_strand) || is_null(temp_1)) {
        return null;
    }
    const temp = find_gene_end_2(head(temp_1));
    return pair(head(temp),all_genes(tail(temp)));

}

function all_different(nums) {
    if (is_null(nums)) {
        return true;
    } else if (is_null(filter(x=> x===head(nums),tail(nums)))) {
        return all_different(tail(nums));
    } else {
        return false;
    }
}


function is_valid_toto_set(nums, n, min, max) {
    if (n !== length(nums)) {
        return false;
    } else if (!is_null(filter(x=>x<min,nums)) || !is_null(filter(x=>x>max,nums))) {
        return false;
    } else {
        return all_different(nums);
    }
}

function num_of_matches(numsA, numsB) {
    function num_of_matches_1(numsA, numsB, counter) {
        if (is_null(numsA)) {
            return counter;
        } else if (is_null(filter(x=> x === head(numsA),numsB))) {
            return num_of_matches_1(tail(numsA),numsB, counter);
        } else {
            return num_of_matches_1(tail(numsA), numsB, counter + 1);
        }
    }
    return num_of_matches_1(numsA, numsB, 0);    
}

function check_winning_group(bet_nums, draw_nums, extra_num) {
    const n = length(draw_nums);
    const base = num_of_matches(bet_nums,draw_nums);
    const baseextrea = num_of_matches(bet_nums,list(extra_num));
    if (base === n) {
        return 1;
    } else if (base === n-1) {
        if (baseextrea === 1) {
            return 2;
        } else {
            return 3;
        }
    } else if (base === n-2) {
        if (baseextrea === 1) {
            return 4;
        } else {
            return 5;
        }
    } else {
        return 0;
    }
}

function evaluate_BAE_tree(bae_tree) {
    function evaluate(left,opp,right) {
        return opp === '+'
                ? left + right
                : opp === '-'
                    ? left - right
                    : opp === '*'
                        ? left * right
                        : opp === '/' 
                            ? left/right
                            : 'error';
    }
    if (is_list(bae_tree)) {
        const left = head(bae_tree);
        const opp = head(tail(bae_tree));
        const right = head(tail(tail(bae_tree)));
        const left_eval = (is_number(left))
                            ? left
                            : evaluate_BAE_tree(left);
        const right_eval = is_number(right)
                            ? right
                            : evaluate_BAE_tree(right);
        return evaluate(left_eval,opp,right_eval);
    } else {
        return bae_tree;
    }
}


function build_BAE_tree(bae_list) {
    function earliestclose(bae_list) {
        for (let i = 0; i < length(bae_list); i = i + 1) {
            if (list_ref(bae_list,i) === ')') {
                return i;
            }
        }
    }
    function closestopen(bae_list,i) {
        for (let j = i-1; j >=0; j = j - 1) {
            if (list_ref(bae_list,j) === '(') {
                return j;
            }
        }
    }
    if (length(bae_list) <= 1) {
        return head(bae_list);
    }
    const end = earliestclose(bae_list);
    const start = closestopen(bae_list,end);
    let temp = null;
    for (let k = start+1; k < end; k = k + 1) {
        temp = pair(list_ref(bae_list,k),temp);
    }
    temp = reverse(temp);
    let new_lst = null;
    for (let m = 0; m < length(bae_list); m = m + 1) {
        if (m === end) {
            new_lst = pair(temp, new_lst);
        } else if (m<end && m >= start) {
            new_lst = new_lst;
        } else {
            new_lst = pair(list_ref(bae_list,m),new_lst);
        }
    }
    new_lst = reverse(new_lst);
    return build_BAE_tree(new_lst);
}

function evaluate_BAE(bae_list) {
    return evaluate_BAE_tree(build_BAE_tree(bae_list));
}

function check_parentheses(paren_list) {
    let counter = 0;
    function helper(paren_list) {
        if (counter < 0) {
            return false;
        } else if (is_null(paren_list)) {
            return counter > 0 ? false : true; 
        } else if (head(paren_list) === '(') {
            counter = counter + 1;
            return helper(tail(paren_list));
        } else if (head(paren_list) === ')') {
            counter =  counter - 1;
            return helper(tail(paren_list));
        } else {
            return helper(tail(paren_list));
        }
    }
    return helper(paren_list);
}
const paren_list = list("(", "(", ")", ")");
check_parentheses(paren_list);
// returns true