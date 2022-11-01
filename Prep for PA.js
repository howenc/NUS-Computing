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
    function take(xs,number) {
        return number < 1
                ? null
                : pair(head(xs),take(tail(xs),number -1));
    }
    function helper(lst,index) {
        if (display(head(lst)) === 'T') {
            if (head(tail(lst)) === 'A') {
                if (head(tail(tail(lst))) === 'G' || head(tail(tail(lst))) === 'A') {
                    return take(list_of_strand,index);
                } else {
                    return helper(tail(lst),index+1);
                }
            } else if (head(tail(lst)) === 'G') {
                if (head(tail(tail(lst))) === 'A') {
                    return take(list_of_strand, index);
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
    return helper(list_of_strand,0);
}

find_gene_end(list("A", "T", "A", "C", "T", "A", "G", 
 "A", "T", "A", "A"));
// returns list(list("A", "T", "A", "C"))
//find_gene_end(list("T", "G", "A", "A", "T", "A", "C",'A'));
// returns list(null)
// find_gene_end(list("A", "T", "A", "C", "C", "A", "G",
//  "A", "T"));
// returns null
