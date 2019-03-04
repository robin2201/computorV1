import { Equation } from "./parse";

export async function resolveEquation(reduced: Equation[], isSecondary: boolean): Promise<any> {
    return isSecondary ? resolveSecondary(reduced) : resolvePrimary(reduced);
}

async function resolveSecondary(reduced: Equation[]): Promise<any> {
    const a: Equation = reduced.find(i => i.power === 2);
    let b: Equation = reduced.find(i => i.power === 1);
    let c: Equation = reduced.find(i => i.power === 0);

    if (a.value === 0) return resolvePrimary([{...b}, {...c}]);

    if (!b) b = { value: 0, power: 1 };
    if (!c) c = { value: 0, power: 0 };

    const delta: number = b.value ** 2 - ( 4 * a.value * c.value );

    if (isNaN(delta)) throw new Error('invalid equation caused by wrong delta');

    if (delta < 0) {
        return { solution : 0, delta, degre: 2 };

    } else if (delta > 0) {

        const deltaSqrt: number = delta ** (1 / 2);

        const x1: number = ( -b.value - deltaSqrt ) / ( 2 * a.value );
        const x2: number = ( -b.value + deltaSqrt ) / ( 2 * a.value );

        return { x1, x2, solution: 2, delta, degre: 2 };

    } else {
        const x1: number = - b.value / ( 2 * a.value );

        return { x1, solution: 1, delta, degre: 2 }
    }
}

async function resolvePrimary(equation: Equation[]): Promise<any> {

    let a: Equation = equation.find(i => i.power === 1);
    let b: Equation = equation.find(i => i.power === 0);

    if (!a || !b) throw new Error('Please enter a valid equation');

    const x1: number = b.value / a.value * -1;

    return {
        degre: 1,
        solution: 1,
        x1
    };
}
