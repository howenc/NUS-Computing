function factorial(x)
{
    return x===1 ? 1 : x * (factorial(x-1));
    
}

factorial(5);

function infactorial(x)
{
    return iter(1,1,x)
}

function iter(product, counter, n)
{
    return counter>n 
            ? product
            :iter(counter * product, counter +1, n)
}