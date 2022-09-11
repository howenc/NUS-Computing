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

function repeat_pattern(n, generate, letter) {
    return n === 0 ? letter : repeat_pattern(n - 1, generate, generate(letter));
}

function list_of_notes(n,letter,interval) {
    return generate_list_of_note(letter,repeat_pattern(n-1,(x)=>append(interval,x),interval));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    return map(x=>instrument(x,duration),list_of_notes(n,note,list_of_interval));
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));
                                  
play(consecutively(repeated_scale("C4", list(2,1,1,3), 3, 0.5, cello)));