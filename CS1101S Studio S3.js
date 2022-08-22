import {overlay, overlay_frac, scale, beside, scale_independent,ribbon, circle, blank, corner, square, translate, anaglyph, hollusion, nova, triangle, stack_frac, stack, beside_frac, heart, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

function moony_1(n)
{
    return n===1
          ? circle
          : beside(
              stack(circle,square),
              stack(blank,moony_1(n-1)));
}

function moony_3(n)
{
    return n===1
          ? circle
          : beside_frac(1/n,stack_frac(1/n,circle,square),stack_frac(1/n,blank,moony_3(n-1)));
}

function moony_3help(n,counter,shape,rune) {
    return counter===n
         ? rune
         : moony_3help(n,counter+1,shape,
                        beside_frac(1/counter,
                                    stack_frac(1/counter,shape,square),
                                    stack_frac(1/counter,blank,rune)));
}

function moony_3iter(n,rune){
    return moony_3help(n,1,rune,rune);
}
show(moony_3iter(9,circle));


//show(beside_frac(1/1,stack_frac(1/1,circle,square),stack_frac(1/1,blank,circle))));