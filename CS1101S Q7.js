import {make_sound,play,adsr, noise_sound, cello, get_duration, bell,silence_sound,sine_sound,simultaneously,consecutively} from "sound";

// Q1

function flatten_tree(xs) {
        return is_null(xs)
            ? null
            : is_list(head(xs))
                ? append(flatten_tree(head(xs)),flatten_tree(tail(xs)))
                : append(list(head(xs)) , flatten_tree(tail(xs)));
}

function generate_list_of_note(letter, list_of_interval) {
    const number = is_number(letter)
                        ? letter
                        : letter === 'C4'
                            ? 60
                            : null;
    return is_null(list_of_interval)
    ? pair(number,null)
    :pair(number,generate_list_of_note(number+head(list_of_interval),tail(list_of_interval)));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_pattern(n, generate, letter) {
    return n === 0 ? letter : repeat_pattern(n - 1, generate, generate(letter));
}

repeat_pattern(1,(x)=>append(pentatonic_list_of_interval,x),pentatonic_list_of_interval);

function list_of_notes(n,letter,interval) {
    return generate_list_of_note(letter,repeat_pattern(n-1,(x)=>append(interval,x),interval));
}

list_of_notes(2,'C4',pentatonic_list_of_interval);

/*
function startofeachlistofnotes(n,list_of_interval,letter) {
    return repeat_pattern(n-1,x=>head(reverse(generate_list_of_note(x,list_of_interval))),head(generate_list_of_note(letter,list_of_interval)));
}

function repeat_pattern(n, generate, letter) {
    return n === 0 ? letter : repeat_pattern(n - 1, generate, generate(letter));
}

repeat_pattern(1,(x)=> head(reverse(generate_list_of_note(x,pentatonic_list_of_interval))),'C4');
startofeachlistofnotes(1,pentatonic_list_of_interval,'C4');

function entire_list_of_sounds(letter,list_of_interval,n,i) {
    return i>n
        ? null
        : pair(generate_list_of_note(startofeachlistofnotes(i,list_of_interval,letter),list_of_interval),entire_list_of_sounds(startofeachlistofnotes(i,list_of_interval,letter),list_of_interval,n,i+1));
}

function flatten_and_play(list) {
    return consecutively(flatten_tree(list));
}

entire_list_of_sounds('C4',pentatonic_list_of_interval,5,1);

(flatten_tree(entire_list_of_sounds('C4',pentatonic_list_of_interval,2,1)));

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));
*/