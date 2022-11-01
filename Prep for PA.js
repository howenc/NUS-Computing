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
