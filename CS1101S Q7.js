import {make_sound,play,adsr, noise_sound, cello, get_duration, bell,silence_sound,sine_sound,simultaneously,consecutively} from "sound";

// Q1

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

const firstlistofnotes = generate_list_of_note('C4',pentatonic_list_of_interval);

function repeat_pattern(n, generate, letter) {
    return n === 0 ? letter : repeat_pattern(n - 1, generate, generate(letter));
}

repeat_pattern(3,(x)=>generate_list_of_note(x,pentatonic_list_of_interval),60);
/*
function repeated_scale(note, list_of_interval, n, duration, instrument) {
    
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));
*/