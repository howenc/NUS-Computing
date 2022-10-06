// Type your program in here!

//Q1
//ev3_speak("words");

const leftwheel = ev3_motorB();
const rightwheel = ev3_motorC();

const tencm = 180; //10cm at 200spd
const rotate_90 = 160;
const pause_duration = 2500;
const pause = ev3_pause;
const run = ev3_runToRelativePosition;
const runleft = x => run(leftwheel, tencm * x, 200);
const runright = x => run(rightwheel, tencm * x, 200);
const rotateleft = x => run(leftwheel, rotate_90 * x, 100);
const rotateright = x => run(rightwheel, rotate_90 * x, 100);

// ev3_motorSetStopAction(leftwheel, "hold");
// ev3_motorSetStopAction(rightwheel, "hold");
// const brake = motor => ev3_motorStop(motor);


//Q2
// runleft(1);
// runright(1);
// pause(pause_duration);

//Q3
// rotateleft(-1);
// rotateright(1.5);
// pause(pause_duration*1.5);

//Q4
//move 10cm
// runleft(1);
// runright(1);
// pause(pause_duration);
//turn left
// rotateleft(-1);
// rotateright(1.5);//rotate right //rotate left
// pause(pause_duration*1.5);
// //move 5cm
// runleft(0.5);
// runright(0.5);
// pause(pause_duration);
// //turn right
// rotateleft(1.5);
// rotateright(-1); //rotate left
// pause(pause_duration*1.5); 
// //move 15cm
// runleft(1.5);
// runright(1.5);
// pause(pause_duration*1.5);

//Mission 2
//Q1
const sensor = ev3_ultrasonicSensor();
/*
function get_distance1(i) {
    if (i>20) {
        return 0;
    } else {
        display(ev3_ultrasonicSensorDistance(sensor));
        pause(1000);
        get_distance1(i+1);
    }
}

get_distance1(0);
*/

//Q2
/*
const sensor = ev3_ultrasonicSensor();
display(ev3_ultrasonicSensorDistance(sensor));
const runleft = x => run(leftwheel, tencm * x, 200);
const runright = x => run(rightwheel, tencm * x, 200);
if (ev3_ultrasonicSensorDistance(sensor) < 10) {
    runleft(100);
    runright(100);
} else {
    runleft(-100);
    runright(-100);    
}

//Q2 ans
function move_and_get_distance1() {
    if (display(ev3_ultrasonicSensorDistance(sensor)) < 200) {
        ev3_motorStop(leftwheel);
        ev3_motorStop(rightwheel);
    } else {
        runright(0.05);
        runleft(0.05);
        move_and_get_distance1();
    }
}

function move_30_cm_back() {
    runright(-3);
    runleft(-3);
    pause(pause_duration*3);
}

move_and_get_distance1();
move_30_cm_back();
*/
//Q3 
/*
function move_and_get_distance1() {
    if ((ev3_ultrasonicSensorDistance(sensor)) < 100) {
        ev3_motorStop(leftwheel);
        ev3_motorStop(rightwheel);
        if (display(math_random())<0.5) {
            turn_right();
            move_forward_by_10_and_check_again_right();
        } else {
            turn_left();
            move_forward_by_10_and_check_again_left();
        }
    } else {
        runright(0.05);
        runleft(0.05);
        move_and_get_distance1();
    }
}
function turn_left() {
    rotateleft(1);
    rotateright(-1.1);
    pause(pause_duration*1.5);
}

function turn_right() {
    rotateleft(-1);
    rotateright(1.1);
    pause(pause_duration*1.5);
}

function move_forward_by_10_and_check_again_right() {
    runright(2);
    runleft(2);
    pause(pause_duration);
    turn_left();
    if ((ev3_ultrasonicSensorDistance(sensor)) < 100) {
        move_forward_by_10_and_check_again_right();
    } else {
        move_and_get_distance1();
    }
}

function move_forward_by_10_and_check_again_left() {
    runright(2);
    runleft(2);
    pause(pause_duration);
    turn_right();
    if ((ev3_ultrasonicSensorDistance(sensor)) < 100) {
        move_forward_by_10_and_check_again_left();
    } else {
        move_and_get_distance1();
    }
}

move_and_get_distance1();
*/
// Mission 3

ev3_colorSensor();