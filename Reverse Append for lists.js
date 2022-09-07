import {make_sound,play, get_duration,silence_sound} from "sound";

// Q1

function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
     return make_sound(head(sound),duration);
}

play(cut_sound(noise_sound(2), 1));

// Q2

function sine_sound(freq, duration) {
    return make_sound(t => math_sin(2*math_PI*freq*t),duration);
}

play(sine_sound(500, 1));

// Q3

function two_consecutively(s1, s2) {
    const durations1 = get_duration(s1);
    const durations2 = get_duration(s2);
    return make_sound((timer => 
                            timer < durations1 
                            ? head(s1)(timer) 
                            : head(s2)(timer-durations1))
                      ,durations1+durations2);
}

const my_sine_1v1 = sine_sound(500, 1);
const my_sine_2v1 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1v1, my_sine_2v1));

// Q4

function consecutively(list_of_sounds) {
    return is_null(list_of_sounds)
    ? silence_sound(0)
    : two_consecutively(head(list_of_sounds),consecutively(tail(list_of_sounds)));
}
const my_sine_1 = sine_sound(500, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(625, 0.5);

play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));

// Q5

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(800,dot_duration);
const dash_sound = sine_sound(800,dash_duration);
const dot_pause = silence_sound(dot_duration);
const dash_pause = silence_sound(dash_duration);

// Create sounds for each letter.
const S_sound = consecutively(list(dot_sound,dot_pause,dot_sound,dot_pause,dot_sound));
const O_sound = consecutively(list(dash_sound,dot_pause,dash_sound,dot_pause,dash_sound));

// Build the signal out of letter sounds and pauses.
const distress_signal = consecutively(list(S_sound,dash_pause,O_sound,dash_pause,S_sound));

// Play distress signal.
play(distress_signal);