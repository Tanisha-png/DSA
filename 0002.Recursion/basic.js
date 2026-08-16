// call the function + trust the function with your input

function PrintNumber(n) {
    // Base condition
    if (n < 0) {
        return;
    }
    // console.log(n)
    PrintNumber(n - 1)
    console.log(n)
}

PrintNumber(3)

// First call - 3 
function PrintNumber(n = 3) {
    // Base condition
    if (3 < 0) {
        return;
    }
    // console.log(n)
    // We are going for two 
    PrintNumber(3 - 1)
    console.log(3)
}

// Still not printed 3 waiting for 2 to complete

// for 2
// function PrintNumber(n = 2) {
//     // Base condition
//     if (2 < 0) {
//         return;
//     }
//     // console.log(n)
//     // We are going for 1 
//     PrintNumber(2 - 1)
//     console.log(2)
// }

// for 1
// function PrintNumber(n = 1) {
//     // Base condition
//     if (1 < 0) {
//         return;
//     }
//     // console.log(n)
//     // We are going for 1 
//     PrintNumber(1 - 1)
//     console.log(1)
// }

// for 0
// function PrintNumber(n = 0) {
//     // Base condition
//     if (0 < 0) {
//         return;
//     }
//     // console.log(n)
//     // We are going for -1 
//     PrintNumber(0 - 1)
//     console.log(0)
// }

// for -1
// function PrintNumber(n = -1) {
//     // Base condition

//     // Condition will become true
//     if (-1 < 0) {
//         return;
//     }

//     PrintNumber(2 - 1)
//     console.log(2)
// }


// Call Stack
// 
// 
// 
//
// 
// 

// Console - 0 1 2 