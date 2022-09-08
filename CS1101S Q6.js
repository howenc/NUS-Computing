import {make_sound,play, get_duration,silence_sound, get_wave, consecutively, sine_sound} from "sound";

// Q1

function backward(sound) {
    return make_sound(t => (get_wave(sound))(get_duration(sound)-t),get_duration(sound));
}

// Q2

function make_list_of_sound(n,sound) {
    return n === 0
    ? silence_sound(0)
    : consecutively(list(sound,make_list_of_sound(n-1,sound)));
}


const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = make_list_of_sound(3, my_sound);
play(my_repeated);

// Q3

function fast_forward(n, sound) {
    const newduration = get_duration(sound);
    return make_sound(t => (get_wave(sound))(t*n),newduration/n);
}