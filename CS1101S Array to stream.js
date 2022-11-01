// Q1

function array_to_stream(a) {
    const len = array_length(a);
    function helper(i) {
        if (i>= len) {
            return null;
        }
        return pair(a[i],()=>helper(i+1));
    }
    return helper(0);
}


display(array_length(anomaly_data) ===
        stream_length(array_to_stream(anomaly_data)));
display(anomaly_data[7] ===
        stream_ref(array_to_stream(anomaly_data), 7));
    
}

// Q2

const FPS = 10;

function array_to_stream(a) {
    const len = array_length(a);
    function helper(i) {
        if (i>= len) {
            return null;
        }
        return pair(a[i],()=>helper(i+1));
    }
    return helper(0);
}

function stream_to_filter(s) {
    function filter(ignored_src,dest) {
        const width = image_width();
        const height = image_height();
        
        let arr = head(s);
        for (let i = 0; i < height; i = i + 1){
            for (let j = 0; j < width; j = j + 1) {
                for (let k = 0; k < 4; k = k +1) {
                        dest[i][j][k] = arr[i][j][k];
                }
            }
        }
    }
    return filter;
}


install_filter(stream_to_filter(array_to_stream(anomaly_data)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q3

const FPS = 10;

function array_to_stream(a) {
    const len = array_length(a);
    function helper(i) {
        if (i>= len) {
            return null;
        }
        return pair(a[i],()=>helper(i+1));
    }
    return helper(0);
}

function stream_to_filter(s) {
    function filter(ignored_src,dest) {
        const width = image_width();
        const height = image_height();
        
        let arr = head(s);
        for (let i = 0; i < height; i = i + 1){
            for (let j = 0; j < width; j = j + 1) {
                for (let k = 0; k < 4; k = k +1) {
                        dest[i][j][k] = arr[i][j][k];
                }
            }
        }
    }
    return filter;
}

function loop(x) {
    function lop(s) {
        if (is_null(s)) {
            return lop(x);
        } 
        return pair(head(s),()=>lop(stream_tail(s)));
    }
    return lop(x);
}

const intergers = integers_from(0);

loop(intergers);


install_filter(
    stream_to_filter(
        loop(array_to_stream(anomaly_data))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 4

const FPS = 10;

function array_to_stream(a) {
    const len = array_length(a);
    function helper(i) {
        if (i>= len) {
            return null;
        }
        return pair(a[i],()=>helper(i+1));
    }
    return helper(0);
}

function stream_to_filter(s) {
    function filter(ignored_src,dest) {
        const width = image_width();
        const height = image_height();
        
        let arr = head(s);
        for (let i = 0; i < height; i = i + 1){
            for (let j = 0; j < width; j = j + 1) {
                for (let k = 0; k < 4; k = k +1) {
                        dest[i][j][k] = arr[i][j][k];
                }
            }
        }
    }
    return filter;
}

function loop(x) {
    function lop(s) {
        if (is_null(s)) {
            return lop(x);
        } 
        return pair(head(s),()=>lop(stream_tail(s)));
    }
    return lop(x);
}

function time_lapse(s, n) {
    function helper(ss,counter) {
        if (counter % n === 0) {
            return pair(head(ss),()=> helper(stream_tail(ss,counter +1)));
        } else {
            return helper(stream_tail(ss),counter+1);
        }
    }
    return helper(s,0);
}


install_filter(
    stream_to_filter(
        time_lapse(loop(array_to_stream(anomaly_data)),
                   3)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();