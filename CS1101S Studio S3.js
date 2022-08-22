import {overlay, overlay_frac, scale, beside, scale_independent,ribbon, circle, blank, corner, square, translate, anaglyph, hollusion, nova, triangle, stack_frac, stack, beside_frac, heart, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

function moony_1(n)
{
    return n===1
          ? circle
          : beside(
              stack(circle,square),
              stack(blank,moony_1(n-1)));
}

function moony_3(n,rune)
{
    return n===1
          ? rune
          : moony_3(n-1,beside_frac(1/n,stack_frac(1/n,circle,square),stack_frac(1/n,blank,rune)));
}



function moony_31(n,counter,rune)
{
    return counter===n
          ? rune
          : moony_31(n,counter+1,beside_frac(1/counter,stack_frac(1/counter,circle,square),stack_frac(1-1/counter,blank,circle)));
}

show(moony_31(1,1,circle));