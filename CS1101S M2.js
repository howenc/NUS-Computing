import {square, stack, show, stack_frac, blank, quarter_turn_right,beside_frac, beside} from "rune";

function fractal(pic, n) {
    return n === 1 ? pic : beside(pic,fractal(stack(pic,pic),n-1));
}

function hook(frac) {
    return frac <= 1 && frac >= 0 
    ? stack(square,beside_frac(1-frac,blank,square))
    : "Invalid - please use a fraction";
}

function spiral(thicc, x)
{
    return x===0 
    ? blank 
    : stack_frac(thicc,hook(thicc/2),quarter_turn_right(spiral(thicc,x-1)));
}

show(spiral(1/5,20));