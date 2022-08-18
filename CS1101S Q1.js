import {from_url, stack_frac, stack, beside_frac, beside, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

const paw = from_url("https://i.imgur.com/GJg95B8.png");
const x = 5;
/*
function start(rune,n)
{
    return beside_frac(1 - 1/n, make_cross(rune),stackn(n-2,rune));
}

function start1(rune,n)
{
    return beside_frac(1-1/n, quarter_turn_right(beside_frac(1 - 1/n, make_cross(rune),stackn(n-2,rune))),stackn(n-1,rune));
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
function do_x_times(rune,x)
{
    return beside_frac(1-1/x, quarter_turn_right(
           beside_frac(1-1/x, quarter_turn_right(
           beside_frac(1-1/x, quarter_turn_right(
           beside_frac(1-1/x, quarter_turn_right(
           make_cross(rune))
           ,stackn(x-2,rune)))
           ,stackn(x-1,rune)))
           ,stackn(x-1,rune)))
           ,stackn(x,rune));
}
//show(beside_frac(1 - 1/n, make_cross(paw),stackn(n-2,paw)));

//show(qtr_turn_add(start(paw,5),5));

show(do_x_times(paw,5));