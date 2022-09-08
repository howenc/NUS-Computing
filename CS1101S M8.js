import {make_sound,play, get_duration,silence_sound,sine_sound,simultaneously,consecutively} from "sound";

// Q1

function get_dtmf_frequencies(number) {
     const row = number === 1 || number === 2 || number === 3 || number === 12 
                    ? 697 
            : number === 4 || number === 5 || number === 6 || number === 13
                    ? 770
            : number === 7 || number === 8 || number === 9 || number === 14
                    ? 852
            : number === 10 || number === 0 || number === 11 || number === 15
                    ? 941
                    : 0;
    const col = number === 1 || number === 4 || number === 7 || number === 10 
                    ? 1209
            : number === 2 || number === 5 || number === 8 || number === 0
                    ? 1336
            : number === 3 || number === 6 || number === 9 || number === 11
                    ? 1477
            : number === 12 || number === 13 || number === 14 || number === 15
                    ? 1633
                    : 0;
    return pair(row,col);
}

// Q2

function make_dtmf_tone(frequency_pair) {
    const headsound = sine_sound(head(frequency_pair),0.5);
    const tailsound = sine_sound(tail(frequency_pair),0.5);
    return simultaneously(list(headsound,tailsound));
}

// Q3

function dial(list_of_digits) {
    const list_of_frequency_pair = map(get_dtmf_frequencies,list_of_digits);
    const list_of_frequency_sound = map(make_dtmf_tone,list_of_frequency_pair);
    return consecutively(list_of_frequency_sound);
}

// Q4
function is_this_list_black_listed(lst) {
    return list_to_string(lst) === list_to_string(list(1,8,0,0,5,2,1,1,9,8,0))
        ? false
        : true;
}

function dial_all(list_of_numbers) {
    const new_list_of_numbers = filter(is_this_list_black_listed,list_of_numbers);
    const map_dial_to_all = map(dial,new_list_of_numbers);
    return consecutively(map_dial_to_all);
}

// Test
 play(dial_all(
  list(
      list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
      list(6,2,3,5,8,5,7,7),
      list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
  ));