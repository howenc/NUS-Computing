// Q1

const WIDTH = 256;
const HEIGHT = 256;
const FPS = 15;
function my_first_filter(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            dest[y][x][0] = y;
            dest[y][x][1] = x;
            dest[y][x][2] = 255-(x+y);
            dest[y][x][3] = 255;
        }
    }
}

install_filter(my_first_filter);
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q2

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function copy(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[i][j][k];
            }
        }
    }
}

function crosshair(src, dest) {
    function square(x) {
        return x*x;
    }
    const width = image_width();
    const height = image_height();
    let c = 1;
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                if (i===height/2 ||j===width/2) {
                    if (k === 0|| k === 3) {
                        dest[i][j][k] = 255;
                    } else {
                        dest[i][j][k] = 0;
                    }
                } else if ((math_sqrt(square(i-height/2)+square(j-width/2))%50)>25) {
                    if (k===2) {
                        dest[i][j][k] = src[i][j][k]+50;
                    } else {
                        dest[i][j][k] = src[i][j][k];
                    }
                } else {
                    dest[i][j][k] = src[i][j][k];
                }
            } 
        }
    }
}

install_filter(copy);
install_filter(crosshair);  // use this filter when crosshair function is ready.
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q3

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function zoom(factor) {
    function zooom(src, dest) {
        const width = image_width();
        const height = image_height();
        const start_height = math_floor(height/2*((factor-1)/factor));
        const start_width = math_floor(width/2*((factor-1)/factor));
        for (let i = start_height; i < height-start_height; i = i + 1) {
            for (let j = start_width; j < width-start_width; j = j + 1) {
                for (let k = 0; k < 4; k = k + 1) {
                    for (let x = 0; x < factor; x = x + 1) {
                        for (let y = 0; y < factor; y = y + 1) {
                            if (x+(factor*math_floor(i-start_height))>=300 || y+(factor*math_floor(j-start_width))>=400) {
                                break;
                            }
                            dest[x+(factor*math_floor(i-start_height))][y+(factor*math_floor(j-start_width))][k] = src[i][j][k];   
                        }
                    }
                }
            }
                    
        }
    }
    return zooom;
}

install_filter(zoom(25));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q4

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function copy_image(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}


function zoom(factor) {
    function zooom(src, dest) {
        const width = image_width();
        const height = image_height();
        const start_height = math_floor(height/2*((factor-1)/factor));
        const start_width = math_floor(width/2*((factor-1)/factor));
        for (let i = start_height; i < height-start_height; i = i + 1) {
            for (let j = start_width; j < width-start_width; j = j + 1) {
                for (let k = 0; k < 4; k = k + 1) {
                    for (let x = 0; x < factor; x = x + 1) {
                        for (let y = 0; y < factor; y = y + 1) {
                            if (x+(factor*math_floor(i-start_height))>=300 || y+(factor*math_floor(j-start_width))>=400) {
                                break;
                            }
                            dest[x+(factor*math_floor(i-start_height))][y+(factor*math_floor(j-start_width))][k] = src[i][j][k];   
                        }
                    }
                }
            }
                    
        }
    }
    return zooom;
}


function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function stack(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_height = math_floor(height / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let i = 0; i < half_height; i = i + 1) {
            dest[i] = temp1[i * 2];
            dest[i + half_height] = temp2[i * 2];
        }

        // take last row from temp2, if height is odd
        for (let i = half_height * 2; i < height; i = i + 1) {
            dest[i] = temp2[i];
        }
    };
}

function beside(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_width = math_floor(width / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let i = 0; i < height; i = i + 1) { 
            for (let j = 0; j < half_width; j = j + 1) {
                dest[i][j] = temp1[i][j * 2];
                dest[i][j + half_width] = temp2[i][j * 2];
            }
        }

        // take last row from temp2, if height is odd
        for (let i = 0; i < height; i = i + 1) {
            for (let j = half_width * 2; j < width; j = j + 1) {
                dest[i][j] = temp2[i][j];
            }
        }
    };
}



install_filter(stack(beside(flip_vertically, color_invert),beside(copy_image, zoom(2))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// Q5

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}

function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function zoom(factor) {
    function zooom(src, dest) {
        const width = image_width();
        const height = image_height();
        const start_height = math_floor(height/2*((factor-1)/factor));
        const start_width = math_floor(width/2*((factor-1)/factor));
        for (let i = start_height; i < height-start_height; i = i + 1) {
            for (let j = start_width; j < width-start_width; j = j + 1) {
                for (let k = 0; k < 4; k = k + 1) {
                    for (let x = 0; x < factor; x = x + 1) {
                        for (let y = 0; y < factor; y = y + 1) {
                            if (x+(factor*math_floor(i-start_height))>=300 || y+(factor*math_floor(j-start_width))>=400) {
                                break;
                            }
                            dest[x+(factor*math_floor(i-start_height))][y+(factor*math_floor(j-start_width))][k] = src[i][j][k];   
                        }
                    }
                }
            }
                    
        }
    }
    return zooom;
}

function compose(filter1, filter2) {
    function filter(src,dest) {
        filter1(src,dest);
        let temp = dest;
        filter2(temp,dest);
    }
    return filter;
}

install_filter(compose(color_invert, zoom(2)));
//install_filter(zoom(2));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

