import {make_sound,play,adsr, noise_sound, cello, get_duration, bell,silence_sound,sine_sound,get_matrix,play_concurrently,set_timeout,clear_all_timeout,simultaneously,consecutively} from "sound";

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

const pentatonic_list_of_interval1 = list(2, 2, 3, 2, 3);

function repeat_pattern(n, generate, letter) {
    return n === 0 ? letter : repeat_pattern(n - 1, generate, generate(letter));
}

function list_of_notes(n,letter,interval) {
    return generate_list_of_note(letter,repeat_pattern(n-1,(x)=>append(interval,x),interval));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    return map(x=>instrument(x,duration),list_of_notes(n,note,list_of_interval));
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval1,
                                  2, 1, cello)));
                                  
play(consecutively(repeated_scale("C4", list(2,1,1,3), 3, 0.5, cello)));

// Q2

function play_matrix(duration, list_of_sounds) {
    function column_get_matrix_list(i,column) {
        return i>15 || i<0
            ? null
            : column>15||column<0
                ? null
                : pair(list_ref(list_ref(get_matrix(),i),column),column_get_matrix_list(i+1,column));
    }
    function my_matrix(column) {
        return column>15||column<0
            ? null
            : is_null(column_get_matrix_list(0,column))
                ? null
                : pair(column_get_matrix_list(0,column),my_matrix(column+1));
    }
    function cross_refer(lst_of_sound,get_matrix_list) {
        return is_null(get_matrix_list)
            ? null
            : head(get_matrix_list)
                ? pair(list_ref(lst_of_sound,0),cross_refer(tail(lst_of_sound),tail(get_matrix_list)))
                : cross_refer(tail(lst_of_sound),tail(get_matrix_list));
    }
    function matrix_of_sounds(counter) {
        return counter > 15 || counter < 0
            ? null
            : is_null(cross_refer(sounds,list_ref(my_matrix(0),counter)))
            ? pair(null,matrix_of_sounds(counter+1))
            : pair(cross_refer(sounds,list_ref(my_matrix(0),counter)),matrix_of_sounds(counter+1));
    }
    const sound_for_n_column = n => list_ref(matrix_of_sounds(0),n-1);
    const c1 = simultaneously(sound_for_n_column(1));
    const c2 = consecutively(list(silence_sound(1*duration),simultaneously(sound_for_n_column(2))));
    const c3 = consecutively(list(silence_sound(2*duration),simultaneously(sound_for_n_column(3))));
    const c4 = consecutively(list(silence_sound(3*duration),simultaneously(sound_for_n_column(4))));
    const c5 = consecutively(list(silence_sound(4*duration),simultaneously(sound_for_n_column(5))));
    const c6 = consecutively(list(silence_sound(5*duration),simultaneously(sound_for_n_column(6))));
    const c7 = consecutively(list(silence_sound(6*duration),simultaneously(sound_for_n_column(7))));
    const c8 = consecutively(list(silence_sound(7*duration),simultaneously(sound_for_n_column(8))));
    const c9 = consecutively(list(silence_sound(8*duration),simultaneously(sound_for_n_column(9))));
    const c10 = consecutively(list(silence_sound(9*duration),simultaneously(sound_for_n_column(10))));
    const c11 = consecutively(list(silence_sound(10*duration),simultaneously(sound_for_n_column(11))));
    const c12 = consecutively(list(silence_sound(11*duration),simultaneously(sound_for_n_column(12))));
    const c13 = consecutively(list(silence_sound(12*duration),simultaneously(sound_for_n_column(13))));
    const c14 = consecutively(list(silence_sound(13*duration),simultaneously(sound_for_n_column(14))));
    const c15 = consecutively(list(silence_sound(14*duration),simultaneously(sound_for_n_column(15))));
    const c16 = consecutively(list(silence_sound(15*duration),simultaneously(sound_for_n_column(16))));
    const combined = simultaneously(list(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16));
    play_concurrently(combined);
    return set_timeout( () => play_matrix(duration, list_of_sounds), duration*15*1000+get_duration(list_ref(sounds,0)));
}

function stop_matrix() {
    return clear_all_timeout();
}

const pentatonic_list_of_interval = list(0, 2, 4, 7, 9);

const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, cello);