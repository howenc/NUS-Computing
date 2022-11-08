// prep for PA

function mergearray(arr1,arr2) {
    let n = math_min(array_length(arr1),array_length(arr2));
    let m = math_max(array_length(arr1),array_length(arr2));
    let temp = [];
    let arr1_counter = 0;
    let arr2_counter = 0;
    for (let i = 0; i<n+m; i = i + 1) {
        if (is_undefined(arr1[arr1_counter])) {
            temp[i] = arr2[arr2_counter];
            arr2_counter = arr2_counter + 1;
        } else if (is_undefined(arr2[arr2_counter])) {
            temp[i] = arr1[arr1_counter];
            arr1_counter = arr1_counter + 1;
        } else if (arr1[arr1_counter] < arr2[arr2_counter]) {
            temp[i] = arr1[arr1_counter];
            arr1_counter = arr1_counter + 1;
        } else {
            temp[i] = arr2[arr2_counter];
            arr2_counter = arr2_counter + 1;
        }
    }
    return temp;
}

function mergesortarray(arr) {
    
}

mergearray([1,4,6,7],[2,3,5,8]);

function mediansortedarrays(arr1,arr2) {
    
}



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

function make_big_int_from_number(num) {
    if (num * 10 % 10 !== 0) {
        return 'decimal detected';
    }
    let lst = null;
    function helper(num) {
        let temp = num % 10;
        lst = pair(temp,lst);
        return math_floor(num/10) === 0 
            ? reverse(lst)
            : helper(math_floor(num/10));
    }
    return helper(num);
}

function big_int_to_string(bint) {
    function helper(bints) {
        return is_null(bints)
            ? ''
            : is_null(tail(bints)) && head(bints) === 0
                ? error('0 detected at the back of the list')
                : big_int_to_string(tail(bints)) + stringify(head(bints));
    }
    return helper(bint);
}

function big_int_add(bintX, bintY) {
    let carry_over = 0;
    let temp = null;
    function helper(bintx,binty) {
        if (is_null(bintx) && is_null(binty)) {
            return temp;
        } else {
            bintx = is_null(bintx) ? list(0) : bintx;
            binty = is_null(binty) ? list(0) : binty;
        }
        let sum = head(bintx) + head(binty) + carry_over;
        if (sum>=10) {
            carry_over = 1;
            sum = sum%10;
        } else {
            carry_over = 0;
        }
        temp = pair(sum,temp);
        return helper(tail(bintx),tail(binty));
    }
    const result = helper(bintX,bintY);
    if (carry_over === 1) {
        return reverse(pair(1,result));
    } else {
        return reverse(result);
    }
}


function big_int_mult_by_digit(bintX, bintY) {
    let carry_over = 0;
    let temp = null;
    if (head(reverse(bintX)) === 0) {
        return 'Invalid big int';
    }
    function helper(bintx,binty) {
        if (is_null(bintx)) {
            return temp;
        } else {
            bintx = is_null(bintx) ? list(0) : bintx;
        }
        let sum = (head(bintx) * binty) + carry_over;
        if (sum>=10) {
            carry_over = math_floor(sum/10);
            sum = sum%10;
        } else {
            carry_over = 0;
        }
        temp = pair(sum,temp);
        return helper(tail(bintx),binty);
    }
    const result = helper(bintX,bintY);
    if (length(result) === length(filter(x=>x===0,result))) {
        return list(0);
    }
    if (carry_over !== 0) {
        return reverse(pair(carry_over,result));
    } else {
        return reverse(result);
    }
}


function big_int_mult_by_10_pow_n(bint, n) {
    return length(bint) === length(filter(x=>x===0,bint))
            ? list(0)
            : n === 0
                ? bint
                : big_int_mult_by_10_pow_n(pair(0,bint), n-1);
}

function big_int_mult(bintX, bintY) {
    let acc = null;
    function helper(bintx,binty,counter) {
        if (is_null(binty)) {
            return accumulate(big_int_add,null,acc);
        }
        const temp = big_int_mult_by_10_pow_n(bintx,counter);
        const temp1 = big_int_mult_by_digit(temp,head(binty));

        acc = pair(temp1,acc);
        return helper(bintx,tail(binty),counter + 1);
    }
    return helper(bintX,bintY,0);
}

function build_largest_int(digits) {
    let max_list = [];
    function max(dig) {
        let temp = 0;
        let index = 0;
        for (let counter = 0; counter < array_length(dig); counter = counter + 1) {
            for (let i = 0; i < array_length(dig); i = i + 1) {
                if (dig[i] > temp) {
                    temp = dig[i];
                    index = i;
                }
            }
            dig[index] = -1;
            max_list[counter] = temp;
            temp = 0;
        }
        return max_list;
    }
    const result = max(digits);
    let str = '';
    for (let j = 0; j < array_length(digits); j = j + 1) {
        str = str + stringify(max_list[j]);
    }
    return str;
}

function swap(A,i,j) {
    let temp = A[i];
    A[i] = A[j];
    A[j] = temp;
    return A;
}

function build_2nd_largest_int(digits) {
    const l = array_length(digits);
    let max_list = [];
    function max(dig) {
        let temp = 0;
        let index = 0;
        for (let counter = 0; counter < l; counter = counter + 1) {
            for (let i = 0; i < l; i = i + 1) {
                if (dig[i] > temp) {
                    temp = dig[i];
                    index = i;
                }
            }
            dig[index] = -1;
            max_list[counter] = temp;
            temp = 0;
        }
        return max_list;
    }
    const result = max(digits);
    function helper(l) {
        if (l-1 === 0) {
            return result;
        } else if (result[l-1] !== result[l-2]) {
            return swap(result,l-1,l-2);
        } else {
            return helper(l-1);
        }
    }
    const second = helper(l);
    let str = '';
    for (let j = 0; j < array_length(digits); j = j + 1) {
        str = str + stringify(max_list[j]);
    }
    return str;
}

function copy_array(arr) {
    const n = array_length(arr);
    let temp = [];
    for (let i = 0; i < n; i = i + 1) {
        temp[i] = arr[i];
    }
    return temp;
}

function sort_ascending(S) {
    return mergesortarray(S);
}

function reverse_array(S) {
    let n = array_length(S);
    for (let i = 0; i < n/2; i = i + 1) {
        swap(S,i,n-1-i);
    }
    return S;
}

function array_to_list(arr) {
    let lst = null;
    const n = array_length(arr);
    for (let i = 0; i < n; i = i + 1) {
        lst = pair(arr[i],lst);
    }
    return reverse(lst);
}

function list_to_array(lst) {
    let arr = [];
    let counter = 0;
    for (let i = lst; !is_null(i); i = tail(i)) {
        arr[counter] = head(i);
    }
    return arr;
}

function digits_to_string(digits) {
    return array_to_string(digits);
}

function array_to_string(arr) {
    const n = array_length(arr);
    let str = '';
    for (let i = 0; i < n; i = i + 1) {
        str = str + stringify(arr[i]);
    }
    return str;
}

function build_nth_largest_int(digits, n) {
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }

    const S = copy_array(digits);
    const len = array_length(S);
    sort_ascending(S);
    reverse_array(S);
    const digit_lst = array_to_list(S);
    const perms = permutations(digit_lst);
    const nth_lst = list_ref(perms, math_min(length(perms), n) - 1);
    const nth = list_to_array(nth_lst);
    return digits_to_string(nth);
}

function count_lower_neighbors(emap,r,c) {
    let arr = [];
    let counter = 0;
    if(r === 0 || r === (array_length(emap))-1 || c === 0 || c === array_length(emap[0])) {
        return 0;
    }
        for (let i =-1; i<=1; i = i + 1) {
            for (let j = -1; j <=1; j = j + 1) {
                arr[counter] = emap[r+i][c+j];
                counter = counter + 1;
            }
        }
    let count = 0;
    for (let i = 0; i < counter; i = i + 1) {
        if (arr[i] < emap[r][c]) {
            count = count + 1;
        }
    }
    return count;
}

function count_peaks(emap) {
    let count = 0;
    for (let i = 1; i < array_length(emap)-1; i = i + 1) {
        for (let j = 1; j < array_length(emap[0])-1; j = j + 1) {
            if (count_lower_neighbors(emap,i,j) === 8) {
                count = count + 1;
            }
        }
    }
    return count;
}

//===============================================================
// TASK 3B
//===============================================================
function count_islands(emap) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const R = array_length(emap);    // emap size is R x C.
    const C = array_length(emap[0]); // emap size is R x C.
    const label = [];                // 2D array for labelling islands.
    let island_count = 0;

    // The function island "floods" an entire island with
    // the label island_id, starting from the position (row, col).
    function label_island(row, col, island_id) {
        if ( row >= 0 && row < R && col >= 0 && col < C ) {
            if ( emap[row][col] !== 0 && label[row][col] === 0 ) {
                label[row][col] = island_id;
                label_island(row, col - 1, island_id);
                label_island(row, col + 1, island_id);
                label_island(row - 1, col, island_id);
                label_island(row + 1, col, island_id);
            } else {}
        } else {}
    }

    // The labels are initialized to 0.
    // The islands are going to be labelled from 1 onwards.
    for (let row = 0; row < R; row = row + 1) {
        label[row] = [];
        for (let col = 0; col < C; col = col + 1) {
            label[row][col] = 0;
        }
    }

    for (let row = 0; row < R; row = row + 1) {
        for (let col = 0; col < C; col = col + 1) {
            if (emap[row][col] !== 0 && label[row][col] === 0) {
                island_count = island_count + 1;
                label_island(row, col, island_count);
            } else {}
        }
    }
    return island_count;
    // ---END TASK---
}