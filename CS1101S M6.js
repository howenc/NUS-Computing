import {draw_connected_full_view, scale, connect_rigidly, rotate_around_origin, translate, unit_line, invert, put_in_standard_position, connect_ends, unit_circle, make_point, draw_connected, x_of, y_of, draw_connected_full_view_proportional} from "curve";

// Q1

function fractal(level, transformation, curve) {
    return level ===0 
         ? curve 
         : fractal(level - 1, transformation, transformation(curve));
}

function levycize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}


draw_connected_full_view_proportional(10000)
    (fractal(11, levycize, unit_line));

// Q2

function dragonize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_ends(invert(
        (rotate_around_origin(0, 0,5*math_PI / 4))(scaled_curve)),
        translate(0.5, 0.5, 0)
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
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
draw_connected_full_view_proportional(10000)(snowflake(5));
// Test
//draw_connected_full_view_proportional(10000)(snowflake(5));
