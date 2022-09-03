import {draw_connected_full_view, unit_circle, make_point, translate, scale, connect_rigidly, draw_points} from "curve";

// Q1

const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack(c1,c2) {
    const tsc1 = translate(0,0.5,0)
                                   (scale(1,0.5,1)(c1)
                                    );
                                    
    const tsc2 = translate(0,0,0)
                                 (scale(1,0.5,1)(c2)
                                  );
                                  
    return connect_rigidly(tsc1,tsc2);
}

draw_points(10000)(stack(test_curve, test_curve));

// Q2


function stack_frac(frac, c1, c2) {
    const tsc1 = translate(0,1-frac,0)
                                   (scale(1,frac,1)(c1)
                                    );
                                    
    const tsc2 = translate(0,0,0)
                                 (scale(1,1-frac,1)(c2)
                                  );
                                  
    return connect_rigidly(tsc1,tsc2);
}

draw_points(10000)
    (stack_frac(1 / 5,
                test_curve,
                stack_frac(1 / 2, test_curve, test_curve)));

