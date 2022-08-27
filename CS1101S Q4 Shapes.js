import {draw_connected_full_view, unit_circle} from "curve";

// Q1

const connect_numbers =
    n => draw_connected_full_view(n)(unit_circle);
    
    
connect_numbers(5); // returns a Drawing of a pentagon

// Q2

const connect_results =
    (n, f) =>
        draw_connected_full_view(n)
        (t => unit_circle(
                         f(math_round(t * n)) / n)
                         );
                         
const star =
    (n,step) => connect_results(n,
                                k=>step*k);


star(11, 4);

// Q3

const wheel =
    (n) => 
    connect_results(n * 3,
                    k => { const v = 3 * math_round((k - 1) / 3);
                           return k % 3 === 1 ? v + (3 *n/2) : v; }
        );

wheel(100);

// Q4

const connect_laps =
    (n, g) =>
    connect_results(n * 3,
                    k => { const v = math_round((k -1) / 3);
                           return k % 3 === 1 ? g(v)*3: v * 3; }
                   );

const draw_times_table =
    (n,m) => connect_laps(n,k=>(m*k));

    
draw_times_table(395,100);   
