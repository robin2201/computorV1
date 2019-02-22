export default [
    {
        type: 2,
        equation: '4 * X^2 - 4 * X^1 + 1 * X^0 = 0',
        reduced: '4 * X^2 - 4 * X^1 + 1 * X^0 = 0',
        solution: 1,
        expected: {
            x1: 0.5
        }
    },{
        type: 2,
        equation: '5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0',
        reduced: '4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0',
        solution: 2,
        expected: {
            x1: 0.9052389907905898,
            x2: -0.47513146390886934
        }
    },{
        type: 2,
        equation: '8 * X^0 - 42 * X^1 - 9.3 * X^2 = 1 * X^0 + 3 * X^2 - 2 * X^1',
        reduced: '4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0',
        solution: 2,
        expected: {
            x1: 0.9052389907905898,
            x2: -0.47513146390886934
        }
    },{
        type: 2,
        equation: "1 * X^2 + 5 * X^1 + 0 * X^0 = 0",
        reduced: "",
        solution: 2,
        expected: {
            x1: 0,
            x2: 5,
        }
    },{
        type: 2,
        equation: "2 * X^2 - 3 * X^1 + 1.125 * X^0 = 0",
        reduced: "",
        solution: 1,
        expected: {
            x1: 0.75,
        }
    },{
        type: 2,
        equation: "1 * X^2 + 3 * X^1 + 10 * X^0 = 0",
        reduced: "",
        solution: 0,
        expected: {
            x1: 0,
        }
    },{
        type: 2,
        equation: "1 * X^2 - 5 * X^1 + 6 * X^0 = 0",
        reduced: "",
        solution: 0,
        expected: {
            x1: 2,
            x2: 3,
        }
    },{
        type: 1,
        equation: "5 * X^0 + 4 * X^1 = 4 * X^0",
        reduced: " 1 * X^0 + 4 * X^1 = 0",
        solution: 1,
        expected: {
            x1: -0.25,
        }
    },{
        type: 1,
        equation: "3 * X^1 + 0 * X^0 = 6 * X^0",
        reduced: " 1 * X^0 + 4 * X^1 = 0",
        solution: 1,
        expected: {
            x1: 2,
        }
    },{
        type: 1,
        equation: "5 * X^0 - 3 * X^1 = - 7 * X^0",
        reduced: "",
        solution: 1,
        expected: {
            x1: 4,
        }
    },{
        type: 1,
        equation: "9 * X^1 + 6 * X^0 = 0",
        reduced: "",
        solution: 1,
        expected: {
            x1: -0.6666666667,
        }
    },{
        type: 1,
        equation: "5 * X^0 = 4 * X^0 + 7 * X^1",
        reduced: "",
        solution: 1,
        expected: {
            x1: -0.6666666667,
        }
    },{
        type: 1,
        equation: "0 * X^2 + 1 * X^1 = 4 * X^0 + 7 * X^1",
        reduced: "",
        solution: 1,
        expected: {
            x1: -0.6666666667,
        }
    },{
        type: 2,
        equation: "1 * X^2 - 3 * X^0 = 0",
        reduced: "",
        solution: 1,
        expected: {
            x1: -0.6666666667,
        }
    },{
        type: 2,
        equation: "5 * X^2 = 5 * X^1",
        reduced: "",
        solution: 1,
        expected: {
            x1: -0.6666666667,
        }
    }
]