// Q1

const increment_repeater = 
        twice =>                                        //the input of i_r must be twice see line 16
        display =>                                      //the input of twice must be display see line 17
        inputofdisplay =>                               //the input of display must be the string "Alert" see line 18
        twice(display)(display(inputofdisplay));        //since i have display, i will display 3 times as it is in memory
      //display(display(display(inputofdisplay)         //but this means that it is hardcoded to have 3
                                                        //so this means that i have to put twice into the code
                                                        //twice = display(display(input))
                                                        //so this means that 2 displays need to be removed
                                                        //twice(display)(display(inputofdisplay)) will work 
                                                        //twice(display(inputofdisplay))(display) doesn't work as it contradicts line 15
                                                        //display(twice(display)(inputofdisplay)) will work
                                                        //no other combinations as twice must have display as input

//twice take display as input and outputs the final thing
//i_r takes twice as input and outputs twice with input display
//thrice takes display as input and outputs function i_r with input twice
//warn takes string "Alert" as input and outputs thrice with input display                                                        

const twice = f => x => f(f(x));

const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT"
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T"
                        // four times in orange
                        // (the REPL will display
                        // "A L E R T"a fifth time
                        // [in white] as the value
                        // returned by bigwarn
const x5 = increment_repeater(fourtimes);
const my_life = x5(display);
//my_life("i wanna kill myself because of this shit");

// Q2
const pair = (x, y) => f => f(x, y);

const head = p => p((x,y)=>x);  // complete lambda expression
const tail = p => p((x,y)=>y);  // complete lambda expression

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true

// i am ending with f(x) and f(y). how to i get rid of the f( )

//pair take the input of (x,y) and gives the output of f(x,y)
//head take the input of f(x,y) and gives the output of x
//tail take the input of f(x,y) and gives the output of y

// Q3

/*

I GOT THE WRONG ANSWER IT IS NOT n^2

enter your answer here; no explanation required

*/

// Q4

const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const increment_repeater = repeater =>
                            f => x => f(repeater, () => repeater(f)(x));
                                                  
const add_repeaters = (currentrepeater, addonrepeater) => 
                                                     f => 
                                                     x => 
                                                     f(currentrepeater,
                                                        () =>((currentrepeater)
                                                                      ((x,y)=>x)
                                                                      (currentrepeater))
                                                              (f)
                                                              (addonrepeater(f)(x))
                                                      );
                                                      
to_int(add_repeaters(two_repeater,
                     three_repeater));  // should return 5
                     
// Q5
const this_arguement_does_not_matter = false;
const decrement_repeater = three_repeater =>                
                             (three_repeater)((x,y)=>x)(this_arguement_does_not_matter);

to_int(decrement_repeater(three_repeater));  // should return 2

// ??? are you even trying get gud nubs