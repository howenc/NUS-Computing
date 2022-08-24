
const twice = display => input => display(display(input));

const increment_repeater = 
        twice =>                                        //the input of i_r must be twice see line 18
        display =>                                      //the input of twice must be display see line 19
        inputofdisplay =>                               //the input of display must be the string "Alert" see line 20
        twice(display)(display(inputofdisplay));        //since i have display, i will display 3 times as it is in memory
      //display(display(display(inputofdisplay)         //but this means that it is hardcoded to have 3
                                                        //so this means that i have to put twice into the code
                                                        //twice = display(display(input))
                                                        //so this means that 2 displays need to be removed
                                                        //twice(display)(display(inputofdisplay)) will work 
                                                        //twice(display(inputofdisplay))(display) doesn't work as it contradicts line 17
                                                        //display(twice(display)(inputofdisplay)) will work
                                                        //no other combinations as twice must have display as input
//twice take display as input and outputs the final thing
//i_r takes twice as input and outputs twice with input display
//thrice takes display as input and outputs function i_r with input twice
//warn takes string "Alert" as input and outputs thrice with input display


const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
//warn("ALERT");          // should display "ALERT"
                        // three times
                        
                        
                        
const pair = (x, y) => f => f(x, y);
const head = (x,y) => x;
pair(1,2)(head);
/*
const head = p => pair(a,b) => a;  // complete lambda expression
const tail = p => pair(a,b) => b;  // complete lambda expression

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true
*/