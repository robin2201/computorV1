import { Equation, IParseEquation } from "./parse";

export enum Colors {
    RESET = "\x1b[0m",
    RED = "\x1b[31m",
    BLUE = "\x1b[34m",
    GREEN = "\x1b[32m",
    YELLOW = "\x1b[33m",
    MAGENTA = "\x1b[35m"
}

export async function displaySolution(equation: string, eq: IParseEquation, reduced: Equation[], solutions?: any): Promise<void> {
    await equationArrayAsString(reduced);

    console.log(`Polynomial Degree: ${applyColor(Colors.YELLOW, eq.degre.toString())}`);

    if (solutions) await printSolution(solutions);
}

export async function equationArrayAsString(eq: Equation[]): Promise<void> {
    let res = ``;
    let first: boolean = true;
    for (const e of eq) {
        if (e.value !== 0) {

            if (e.value > 0 && !first) res += '+ ';

            res += `${e.value} * X^${e.power} `;
        }

        first = false;
    }

    res += `= 0`;

    console.log(`Reduced: ${applyColor(Colors.BLUE, res.replace('-', '- '))}`);
}

async function printSolution(res: any): Promise<void> {
    let print = '';

    if (res.degre === 2) {

        print += `Discriminant: ${applyColor(Colors.YELLOW, res.delta)}`;

        if (res.delta > 0) print += ', is positive';
        else if (res.delta < 0) print += ', is negative';
        else if (res.delta === 0) print += ', equal 0';

        print += '\n';
    }

    print += `${res.solution} solution${res.solution > 1 ? 's' : ''}${res.solution === 0 ? ` dans R mais ${applyColor(Colors.RED, '2 solutions complexe pour cette équation')}` : ' '}: {\n`;

    if (res.solution === 2) {
        print += `  X1: ${applyColor(Colors.YELLOW, res.x1)}\n  X2: ${applyColor(Colors.YELLOW, res.x2)}`;
    } else if (res.solution === 1) {
        print += `  X0: ${applyColor(Colors.YELLOW, res.x1)}`;
    } else {
        // print += `  ${applyColor(Colors.RED, '2 solutions complexe pour cette équation\n')}`;
        print += `  X1: ${applyColor(Colors.YELLOW, res.x1)}\n  X2: ${applyColor(Colors.YELLOW, res.x2)}`;
    }

    print += `\n}`;

    console.log(print);
}

export function applyColor(color: string, value: string): string {
    return `${color + value + Colors.RESET}`;
}