// Q1

function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
        ? ''
        : binary_search_tree_to_string(left_branch(bst)) 
        + entry(bst) + '; ' 
        + binary_search_tree_to_string(right_branch(bst));
}

const h = make_tree("h", make_empty_tree(), make_empty_tree());
const a = make_tree("a", make_empty_tree(), make_empty_tree());
const n = make_tree("n", h, make_empty_tree());
const c = make_tree("c", a, make_empty_tree());
const test_bst = make_tree("e", c, n);


// Test
binary_search_tree_to_string(test_bst);
binary_search_tree_to_string(cadet_names);

// Q2

function find(bst, name) {
    return is_empty_tree(bst)
        ? false
        : entry(bst) === name
        ? true
        : find(left_branch(bst),name) || find(right_branch(bst),name);
}

// Test
 find(cadet_names, "CHEONG HOWEN");

// Q3

function insert(bst, item) {
    return is_empty_tree(bst)
            ? make_tree(item,make_empty_tree(),make_empty_tree())
            : item < entry(bst)
                ? make_tree(entry(bst),insert(left_branch(bst),item),right_branch(bst))
                : make_tree(entry(bst),left_branch(bst),insert(right_branch(bst),item));
        
}

function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
        ? ''
        : binary_search_tree_to_string(left_branch(bst)) 
        + entry(bst) + '; ' 
        + binary_search_tree_to_string(right_branch(bst));
}

function find(bst, name) {
    return is_empty_tree(bst)
        ? false
        : entry(bst) === name
        ? true
        : find(left_branch(bst),name) || find(right_branch(bst),name);
}

// Test

//binary_search_tree_to_string(insert(make_empty_tree(), "x"));
//Should produce "x; "

const bst = accumulate((item, bst) => insert(bst, item),
                     make_empty_tree(),
                     list("g", "a", "r", "x", "p"));
//binary_search_tree_to_string(bst);


//Should produce "a; g; p; r; x; "

const cadet_names_with_aaaaron =  insert(cadet_names, "AAAARON NORAAAA");
//binary_search_tree_to_string(cadet_names_with_aaaaron);
//Should produce "AAAARON NORAAAA; ..."