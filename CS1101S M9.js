import {make_sound,play,adsr, noise_sound, cello, get_duration,silence_sound,sine_sound,simultaneously,consecutively} from "sound";

// Q1

const violin_envelope = adsr(1, 0, 1, 0);
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function bass_drum(note, duration) {
    return drum_envelope(simultaneously(list(sine_sound(75,duration),sine_sound(150,duration))));
}

function mute(note, duration) {
    return silence_sound(duration);
}


// Test
play(snare_drum(50, 0.2));
play(bass_drum(50, 0.2));

play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                        mute(0, 0.2),
                        snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));

// Q2

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

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note( 'C4', major_scale_interval);

function list_to_sound(list_of_midi_notes,duration,instrument) {
    function list_to_sound_helper(lst, duration, instrument) {
        const new_sound = is_null(lst)
            ? pair(silence_sound(0),null)
            : pair(instrument(head(lst),duration),list_to_sound_helper(tail(lst),duration,instrument));
        return new_sound;
    }
    return consecutively(list_to_sound_helper(list_of_midi_notes,duration,instrument));
}


const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = generate_list_of_note( 'C4', harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note( 'C4', melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
play(c_melodic_minor_scale_sound);


// Q3

const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each, instrument) {
    function extract_n(list,n,i) {
    return is_null(list)
            ? null
            : n<i
            ? pair(list_ref(list,0),extract_n(tail(list),n+1,i))
            : null;
    }
    function makelistofextract(list,size) {
        return is_null(list)
        ? null
        : length(list) < size
            ? null
            : pair(extract_n(list,0,size),makelistofextract(tail(list),size));
    }
    function flatten_tree(xs) {
        return is_null(xs)
            ? null
            : is_list(head(xs))
                ? append(flatten_tree(head(xs)),flatten_tree(tail(xs)))
                : append(list(head(xs)) , flatten_tree(tail(xs)));
    }
    return list_to_sound(flatten_tree(makelistofextract(arpeggio,4)),duration_each,instrument);
}

// Test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello));

// Q4

function simplify_rhythm(rhythm) {
    function repeat(pir) {
        function repeating(list_to_repeat,n) {
            return n===0 
                ? null
                : pair(list_to_repeat,repeating(list_to_repeat,n-1));
        }
        return is_null(pir)
            ? null
            : is_pair(pir)
            ? is_number(tail(pir))
                ? repeat(repeating(head(pir),tail(pir)))
                : pair(repeat(head(pir)),repeat(tail(pir)))
            : pir;
    }
    function flatten_tree(xs) {
        return is_null(xs)
            ? null
            : is_list(head(xs))
                ? append(flatten_tree(head(xs)),flatten_tree(tail(xs)))
                : append(list(head(xs)) , flatten_tree(tail(xs)));
    }    

    return flatten_tree(repeat(my_rhythm));
}

// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);
display_list(my_simple_rhythm);


const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
equal(my_simple_rhythm, correct_simple_rhythm);

// Q5