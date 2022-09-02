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

function levycize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}

function dragonize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_ends(invert(
        (rotate_around_origin(0, 0,5*math_PI / 4))(scaled_curve)),
        translate(0.5, 0.5, 0)
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}

function fractal(level, transformation, curve) {
    return level ===0 
         ? curve 
         : fractal(level - 1, transformation, transformation(curve));
}


draw_connected_full_view_proportional(10000)
    (fractal(11, dragonize, unit_line));

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
