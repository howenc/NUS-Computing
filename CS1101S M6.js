import {draw_connected_full_view, connect_ends, unit_circle, make_point, draw_connected, x_of, y_of, draw_connected_full_view_proportional} from "curve";

// Q1

function s_generator(pt) {
    const xcord = x_of(pt);
    const ycord = y_of(pt) + 1;
    const ycord2 = ycord - 2;
    return t => t <= 1/2 
                ? make_point(math_cos(2 * math_PI * (2 * t * 3/4))+ xcord,
                             math_sin(2 * math_PI * (2 * t * 3/4))+ ycord)
                : make_point(math_cos(2 * math_PI * (2 * t * 3/4))+ xcord,
                             math_sin(2 * math_PI * (-2 * t * 3/4)) + ycord2);
}

const my_s = s_generator(make_point(0,0));

function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)),
                            y_of(curve(t))
                          );
}

(draw_connected_full_view_proportional(200))(reflect_through_y_axis(my_s));

// Q2

function straightline(curve) {
    const startxcord = x_of(curve(make_point(0,0))
                            (0)
                            );
    const startycord = y_of(curve(make_point(0,0))
                            (0)
                            );
    const endxcord = x_of(curve(make_point(0,0))
                          (1)
                          );
    const endycord = y_of(curve(make_point(0,0))
                          (1)
                          );
    return t => make_point((startxcord-endxcord) *t,
                           (startycord-endycord) *t
                           );
}

function close(curve) {
    return connect_ends(s_generator(make_point(0,0)),
                        straightline(s_generator)
                        );    
}

/*
function vertical_line(makepoint, length) {
    const xcord = x_of(makepoint);
    const ycord = y_of(makepoint);
    return t => make_point(xcord, ycord+(length*t));
}
very interesting, it does not matter where i put the vertical line, it will always
start at the end of the 1st curve, even if i put another coordinate as the starting
point for the next curve.

its like it resets and actually draws another curve using another point as its centre
it calculates the 2nd centre by using the ending point of the 1st curve, taking that point as
its starting and than work backwords to get the centre. after that i completes the 2nd curve
with the new centre as the point.

amazing
*/

draw_connected_full_view_proportional(200)(close(s_generator));

// Q3 

function kochize(curve) {
    const up_60 = rotate_around_origin(0, 0, math_PI / 3);
    const down_60 = rotate_around_origin(0, 0, - math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}

function fractal(level, transformation, curve) {
    return level ===1 
         ? curve 
         : fractal(level - 1, transformation, transformation(curve));
}

function snowflake(n) {
    return connect_ends(
                        connect_ends(
                                    fractal(n+1,kochize,unit_line),
                                    (rotate_around_origin(0, 0, -2*math_PI/3))(fractal(n+1,kochize,unit_line))),
                        rotate_around_origin(0, 0, 2*math_PI/3)(fractal(n+1,kochize,unit_line))
                        );
}
/*
6 sides
connect_ends(
                        connect_ends(
                                    connect_ends(
                                                (fractal(n,kochize,unit_line)),
                                                (rotate_around_origin(0, 0, -math_PI /3))(fractal(n,kochize,unit_line))),
                                    (rotate_around_origin(0, 0, -2*math_PI/3))(fractal(n,kochize,unit_line))),
                        connect_ends(
                                     connect_ends(
                                                 (rotate_around_origin(0, 0, -math_PI))(fractal(n,kochize,unit_line)),
                                                 (rotate_around_origin(0, 0,2* math_PI/3))(fractal(n,kochize,unit_line))),
                                    (rotate_around_origin(0, 0, math_PI/3))(fractal(n,kochize,unit_line))));
*/
draw_connected_full_view_proportional(10000)(snowflake(0));
// Test
//draw_connected_full_view_proportional(10000)(snowflake(5));
