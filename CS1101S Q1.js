import {from_url, stack_frac, stack, beside_frac, heart, beside, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

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

function besiden1(n,rune)
{
    return quarter_turn_right(stackn(n,quarter_turn_left(rune)));
}

function besiden(n, rune) {
   return n === 1
   ? rune
   : beside_frac(1/n,rune,
                besiden(n-1,rune));
}

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
show(persian(paw,5));

function addleftright(center,pattern,x)
{
    return beside_frac(1/(x),stackn(x-2,pattern),beside_frac(1- 1/(x-1), center,stackn(x-2,pattern)));
}

function addtopdown(center,pattern,x)
{
    return stack_frac(1/(x),besiden(x-2,pattern),stack_frac(1- 1/(x-1), center,besiden(x-2,pattern)));
}

show(addleftright(addtopdown(make_cross(paw),paw,5),paw,5));

function addlrwtd(center,pattern,x)
{
    return beside_frac(1/(x),stackn(x,pattern),beside_frac(1- 1/(x-1), center,stackn(x,pattern)));
}

function both(center, pattern, x)
{
    return addlrwtd(addtopdown(center,pattern,x),pattern,x);
}

function refinedpersian(rune,x)
{
    return both(make_cross(rune),rune,x);
}

show(refinedpersian(paw,5));

/*
function add4side(center,pattern,x)
{
    return addleftright(quarter_turn_right(addleftright(quarter_turn_right(center),pattern,x)),quarter_turn_right(pattern),x+2);
}

function addtopdown1(center,pattern,x)
{
    return quarter_turn_right(beside_frac(1/(x),stackn(x-2,quarter_turn_left(pattern)),beside_frac(1- 1/(x-1), center,stackn(x-2,quarter_turn_left(pattern)))));
}

function add4side1(center,pattern,x,counter)
{
    return counter===1
    ? addleftright(center,quarter_turn_right(pattern),x)
    : addleftright(quarter_turn_left(add4side1(center,quarter_turn_right(pattern),x,counter-1)),quarter_turn_right(pattern),x+2);
}
*/

//show(beside_frac(1 - 1/n, make_cross(paw),stackn(n-2,paw)));

//show(qtr_turn_add(start(paw,5),5));
