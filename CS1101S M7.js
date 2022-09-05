// Q1

function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
     return make_sound(head(sound),duration);
}

play(cut_sound(noise_sound(2), 1));
