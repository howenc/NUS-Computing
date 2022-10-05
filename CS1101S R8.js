//Q1
function make_withdraw(balance,password) {
    function withdraw(amount,pass) {
        if (account_disable === 1) {
            return 'Account disabled';
        } else if (pass !== password) {
            attempts = attempts + 1;
            display(attempts);
            if (attempts > 2) {
                account_disable = 1;
                return 'Wrong password; no withdraw';
            } else {
                return 'Wrong password; no withdraw';
            }    
        } else if (balance >= amount) {
            attempts = 0;
            balance = balance - amount;
            return balance;
        } else {
            attempts = 0;
            return "Insufficient funds";
        }
    }
    let attempts = 0;
    let account_disable = 0;
    return withdraw;
}

const acc = make_withdraw(100,'my_password');

acc(30, "his_passcode"); // returns "Wrong password; no withdraw"
acc(30, "my_password"); // returns 70
acc(10, "sesame"); // returns "Wrong password; no withdraw"
acc(15, "canola"); // returns "Wrong password; no withdraw"
acc(25, "olive"); // returns "Wrong password; no withdraw"
acc(30, "my_password"); // returns "Account disabled"
acc(30, "his_passcode"); // returns "Account disabled"

// Q2