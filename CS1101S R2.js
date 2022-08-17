//Q1 - recursive
function factorial(n)
{
    return n===1
    ? 1
    : n * factorial(n-1);
}

//Q2 - a step is a substitution or expansion or evaluation

factorial(5);

/*
Q3 -10

factorial(5);
5 * factorial(4);
(5 * (4 * factorial(3)));
(5 * (4 * (3 * factorial(2))));
(5 * (4 * (3 * (2 * factorial(1)))));
(5 * (4 * (3 * (2 * 1))));
(5 * (4 * (3 * 2)));
(5 * (4 * 6));
5 * 24;
120;
*/

//Q4 - 4 extra deferred operations

function factoria1(n)
{
    return iter(1, 1, n);
}

function iter(product, counter, n)
{
    return counter > n
           ? product
           : iter(counter * product, counter + 1, n);
}

/*

Q5 - 13

factoria1(5);
iter(1, 1, 5);
FALSE - iter(1*1, 1, 5)
FALSE - iter(1*2, 2, 5)
FALSE - iter(1*2*3, 3, 5)
FALSE - iter(1*2*3*4, 4, 5)
FALSE - iter(1*2*3*4*5, 5, 5)
TRUE - 1*2*3*4*5
(1*(2*(3*(4*5))))
(1*(2*(3*20)))
(1*(2*60))
1*120
120
*/

//Q6 - 7 extra deffered operations

//Q7 - recursive

