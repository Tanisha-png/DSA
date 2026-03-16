// {()}
// {(}

// { } ([])

function IsBalanced(str) {
    const stack = []
    const pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    }

    //  if you get the opening bracket push it to stack 
    for (let char of str) {
        if (char in pairs) {
            stack.push(char);

        } else {

            // if you get the closing bracket remove the top element from the stack and compare it with 
            // closing bracket it there are pair move forard otherwise stop 
            const lastOpen = stack.pop();

            if (pairs[lastOpen] !== char) {
                return false;
            }

        }
    }

    return stack.length === 0
}

console.log(IsBalanced("([{}])"))