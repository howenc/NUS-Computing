import {random_color,from_url, stack_frac, stack, nova, beside_frac, heart, beside, quarter_turn_right,quarter_turn_left, make_cross, rcross, stackn, show} from "rune";

function besiden(n, rune) {
   return n === 1
   ? rune
   : beside_frac(1/n,rune,
                besiden(n-1,rune));
}

function besiden1(n,rune)
{
    return quarter_turn_right(colorstackn(n,quarter_turn_left(rune)));
}

function carpet(n, m, rune) {
    return stackn(m,(besiden(n,rune)));
}

function colorbesiden(n, rune) {
   return n === 1
   ? rune
   : beside_frac(1/n,random_color(rune),
                colorbesiden(n-1,random_color(rune)));
}

function colorstackn(n, rune) {
   return n === 1
   ? rune
   : stack_frac(1/n,random_color(rune),
                colorstackn(n-1,random_color(rune)));
}

function colorstack(n,rune1,rune2){
    return stack_frac(1/n,rune1,rune2);
}

function repeat(counter,row_count,column_count,rune,thing_to_repeat){
    return counter === row_count
         ? thing_to_repeat
         : repeat(counter+1,row_count,column_count,rune,colorstack(counter,colorbesiden(column_count,rune),thing_to_repeat));
}

function randomly_colored_carpet(row_count,column_count,rune){
    return repeat(1,row_count+1,column_count,rune,colorbesiden(column_count,rune));
}

show(randomly_colored_carpet(3,3,heart));

show(repeat(1,4,4,heart,colorbesiden(4,heart)));

//show(stackn(4,colorbesiden(4,heart)));
//show(colorstack(3,colorbesiden(4,heart),colorstack(2,colorbesiden(4,heart),colorstack(1,colorbesiden(4,heart),heart))));

/*
function fuckthisshit(n,m,rune){
    for (i > 0,i = n,i++){
        for (j>0, j=m, j++){
            print(random_color(heart));
        }
    }
}

fuckthisshit(3,4,heart)
*/

//show(stack_frac(1/4,colorbesiden(4,heart),stack_frac(1/3,colorbesiden(4,heart),stack_frac(1/2,colorbesiden(4,heart),colorbesiden(4,heart)))));


function reprat(n,counter){
    return stack_frac(1/n+1,colorbesiden(4,heart));
}
//stack_frac(1/n+1,colorbesiden(4,heart),stack_frac(1/n+1,colorbesiden(4,heart),stack_frac(1/n+1,colorbesiden(4,heart),x)));
