// TASK 1

function max_flies_to_eat(tile_flies) {
    const column = array_length(tile_flies[0]);
    const row = array_length(tile_flies);
    function f(i,j) {
        display('a');
        if (i<0 || j<0) {
            return 0;
        } else if (i> row-1 || j > column-1) {
            return 0;
        } else {
            const add_left = tile_flies[i][j] + f(i+1,j-1);
            const add_middle = tile_flies[i][j] + f(i+1,j);
            const add_right = tile_flies[i][j] + f(i+1,j+1);
                return math_max(add_left,add_middle,add_right);
            }
    }
    let ref = 0;
    for (let j = 0; j < column; j=j+1) {
        if (f(0,j)>ref) {
           ref = f(0,j); 
        } else {
            ref = ref;
        }
    }
    return ref;
}

//TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];



max_flies_to_eat(tile_flies); // Expected result: 32


let mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function memo_max_flies_to_eat(tile_flies) {
    mem = [];
    const column = array_length(tile_flies[0]);
    function f(i,j) {
        if (!is_undefined(read(i,j))) {
            return read(i,j);
        } else if (i<0 || j<0) {
            return 0;
        } else if (i>5 || j > 4) {
            return 0;
        } else {
            const add_left = tile_flies[i][j] + f(i+1,j-1);
            const add_middle = tile_flies[i][j] + f(i+1,j);
            const add_right = tile_flies[i][j] + f(i+1,j+1);
            const results = (add_left > add_right && add_left > add_right) 
                            ? add_left
                            : (add_right> add_left && add_right > add_middle)
                                ? add_right
                                : add_middle;
            write(i,j,results);
            return results;
        }
    }
    let ref = 0;
    for (let j = 0; j < column; j=j+1) {
        if (f(0,j)>ref) {
           ref = f(0,j); 
        } else {
            ref = ref;
        }
    }
    return ref;


}

// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];

memo_max_flies_to_eat(tile_flies); // Expected result: 32