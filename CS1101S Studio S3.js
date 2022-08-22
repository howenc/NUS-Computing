import {overlay, overlay_frac, scale, beside, scale_independent,ribbon, circle, blank, corner, square, translate, anaglyph, hollusion, nova, triangle, stack_frac, stack, beside_frac, heart, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

function moony_1(rune)
{
    return beside(stack(circle,square),stack(blank,rune));
}

show(moony_1(circle));