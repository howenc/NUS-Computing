import {draw_connected_full_view, unit_circle, make_point, draw_connected, x_of, y_of, draw_connected_full_view_proportional} from "curve";

// Q1

// Part 1
// I don't understand but it should be line right? 
//your answer here (keep your answer commented)


// Part 2
function vertical_line(pt, length) {
    return t => make_point(0.5,pt +length*t);
}


// Part 3
// I don't understand but it should be line right?
// your answer here (keep your answer commented)


// Part 4
draw_connected(90)(vertical_line(0.25,0.5));
//this is what the question is asking right?

// Q2


function three_quarters(pt) {
    const xcord = x_of(pt);
    const ycord = y_of(pt);
    return t => make_point(math_cos(2*math_PI*(t*3/4))+xcord,math_sin(2*math_PI*(t*3/4))+ycord);
}

draw_connected_full_view_proportional(200)(three_quarters(make_point(0.5,0.25)));

//draw_connected_full_view_proportional(200)(three_quarters(make_point(0.5, 0.25)));

//draw_connected_full_view_proportional(200)(three_quarters(make_point(0,0)));




//makepoint => (x,y) =>makepoint(math_cos(2*math_PI*t+x),math_sin(2*math_PI*t+y)))(t)(1,1)(makepoint)

// Q3

function s_generator(pt) {
    const xcord = x_of(pt);
    const ycord = y_of(pt);
    const ycord2 = ycord -2;
    return t => t <= 1/2 
                ? make_point(math_cos(2*math_PI*(2*t*3/4))+xcord,math_sin(2*math_PI*(2*t*3/4))+ycord)
                : make_point(math_cos(2*math_PI*(2*t*3/4))+xcord,math_sin(2*math_PI*(-2*t*3/4))+ycord2);
}


draw_connected_full_view_proportional(200)(s_generator(make_point(0.5, 0.25)));
