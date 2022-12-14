import {overlay, overlay_frac, scale, scale_independent, circle, blank, corner, square, translate, anaglyph, hollusion, nova, triangle, stack_frac, stack, beside_frac, heart, beside, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";


//Question 1
function steps(r1,r2,r3,r4){
    return overlay(beside(overlay(stack(r4,blank),stack(blank,r3)),blank),beside(blank,overlay(stack(blank,r2),stack(r1,blank))));
}

function make_quadrant(rune){
    return beside(blank,stack(rune,blank));
}

function rotaterunequadrant(rune,quadrant){
    return quadrant === 1
    ? beside(blank,stack(rune,blank))
    : rotaterunequadrant(quarter_turn_left(rune),quadrant-1);
}

function rotatequadrant(rune,how_many_times){
    return how_many_times === 1
    ? rune
    :quarter_turn_right(rotatequadrant(rune,how_many_times-1));
}

function rotate(rune,x){
    return rotatequadrant(rotaterunequadrant(rune,x),x);
}

function refinedsteps(r1,r2,r3,r4){
    return overlay(overlay(rotate(r4,4),rotate(r3,3)),overlay(rotate(r2,2),rotate(r1,1)));
}

//show(refinedsteps(rcross,triangle,corner,nova));

//Question 2

function conehelp(counter,constant,rune){
    return counter===1
         ? rune
         : overlay_frac(1-1/counter,scale(1-1/counter,conehelp(counter-1,constant,rune)),constant);
}

function cone(n,rune){
    return conehelp(n,rune,rune);
}

show(cone(20,circle));
//hollusion(cone(4,circle));

//show(overlay(scale(3/4,overlay(scale(2/3,overlay(scale(1/2,circle),circle)),circle)),circle));

//show(overlay_frac(3/4,scale(3/4,overlay_frac(2/3,scale(2/3,overlay_frac(1/2,scale(1/2,circle),circle)),circle)),circle));