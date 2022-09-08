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

// Q4

function echo(n, d, sound) {
    function make_a_list_of_sounds_but_with_things_added_to_it(n,d,sound) {
        return n === -1
        ? silence_sound(0)
        : consecutively(list(consecutively(list(silence_sound(d),sound)),make_a_list_of_sounds_but_with_things_added_to_it(n-1,d,half_amplitude(sound))));
    }
    function cut_sound(sound, duration) {
        return make_sound(head(sound),duration);
    }

    function half_amplitude(sound) {
        const newduration = get_duration(sound);
        return make_sound(t => (get_wave(sound))(t/2),newduration);
    }
    
    const new_sound_full_duration_and_echo_with_half_amplitude_and_delay_for_first_beep = 
                                                                                        make_a_list_of_sounds_but_with_things_added_to_it(n,d,sound);
    const new_soun_but_backwards = 
                                backward(new_sound_full_duration_and_echo_with_half_amplitude_and_delay_for_first_beep);
    const cut_off_the_delay = 
                            cut_sound(
                                    new_soun_but_backwards,
                                    get_duration(new_soun_but_backwards)-d);
    const new_sound = backward(cut_off_the_delay);
    
    return new_sound;
}

const test_sound = sine_sound(800, 0.5);
play(echo(2, 0.4, test_sound));

// Q5

function make_alien_jukebox(sound) {
    return x=>x===0
        ? play(sound)
        : x===1
            ? play(backward(sound))
            : x === 2
                ? play(fast_forward(1/2,sound))
                : x === 3
                    ? play(make_list_of_sound(3,fast_forward(2,sound)))
                    :x===4
                        ? play(echo(4,0.3,backward(sound)))
                        : 'Please input from 1-4';
}
// Press "Run"

// Then test in REPL:

// init_record();

// const erksh_voice = record_for(1, 0.2);

// const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording

// j(1);  // plays it backward

// j(2);  // plays it at half speed

// j(3);  // plays it at double speed, three times in a row

// j(4);  // plays it backward with 4-times echo,
//        //     with 0.3 seconds echo delay