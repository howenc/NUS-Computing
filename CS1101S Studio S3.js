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



function fast_exp(x, e) {
    return e === 0
        ? 1
        : e % 2 === 0
            ? sqr(fast_exp(x, e/2))
            : x * fast_exp(x, e - 1);
}

function sqr(x) {
    return x * x;
}



function fast_exp_iter_helper(x, e, result, count) {
    //display(count);
    return count === e
        ? result
        : count > e
            ? fast_exp_iter_helper(x, e, result / x, count - 1)
            : count % 2 === 0 && count > 0
                ? fast_exp_iter_helper(x, e, result * result, count * 2)
                : fast_exp_iter_helper(x, e, result * x, count + 1);
}

function fast_exp_iter(x, e) {
    return fast_exp_iter_helper(x, e, 1, 0);
}

function fast_exp_cps_helper(x, e, result_producer) {
    return e === 0
        ? result_producer(1)
        : e % 2 === 0
            ? fast_exp_cps_helper(x, e/2, (next) => result_producer(next * next))
            : fast_exp_cps_helper(x, e-1, (next) => result_producer(next * x));
}

function fast_exp_cps(x, e) {
    return fast_exp_cps_helper(x, e, (next) => next);
}

function exp_test(f, base, start, end) {
    display(f(base, start));
    return start >= end 
        ? 0 
        : exp_test(f, base, start + 1, end);
}

exp_test(fast_exp_iter, 2, 0, 10);
exp_test(fast_exp_cps, 2, 0, 10);

//show(beside_frac(1/1,stack_frac(1/1,circle,square),stack_frac(1/1,blank,circle))));