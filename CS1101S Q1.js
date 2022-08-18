import {from_url, stack_frac, stack, beside_frac, beside, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

const paw = from_url("https://i.imgur.com/GJg95B8.png");
const x = 5;
/*
function start(rune,n)
{
    return beside_frac(1 - 1/n, make_cross(rune),stackn(n-2,rune));
}

function qtr_turn_add(rune,n)
{
    return beside_frac(1-1/n, quarter_turn_right(rune), stackn(n-1,paw));
}
*/

function turn_upside_down(rune)
{
    return quarter_turn_right(quarter_turn_right(rune));
}
function persian(rune,x)
{
    return beside_frac(1-1/x, quarter_turn_right(
           beside_frac(1-1/x, quarter_turn_right(
           beside_frac(1-1/(x-1), quarter_turn_right(
           beside_frac(1-1/(x-1), quarter_turn_right(
           make_cross(rune))
           ,stackn(x-2,quarter_turn_right(rune))))
           ,stackn(x-1,turn_upside_down(rune))))
           ,stackn(x-1,quarter_turn_left(rune))))
           ,stackn(x,rune));
}
//show(beside_frac(1 - 1/n, make_cross(paw),stackn(n-2,paw)));

//show(qtr_turn_add(start(paw,5),5));

show(do_x_times(paw,5));
show(quarter_turn_right(do_x_times(paw,5)));
show(turn_upside_down(do_x_times(paw,5)));
show(quarter_turn_left(do_x_times(paw,5)));