import { parseEquation, IParseEquation, Equation } from "./parse";
import { reduceEquation } from "./reduce";
import { resolveEquation } from "./resolve";
import { displaySolution } from "./display";
import { handleErrors } from "./errors";
import { Colors, applyColor } from "./display";
import testEquations from './test';

async function main(equation: string): Promise<void> {

    let headerDisplay = '';

    for (let i = 0; i < equation.length + 10; i++) headerDisplay +='#';

    console.log(`${applyColor(Colors.MAGENTA, headerDisplay)}`);

    console.log(`Equation: ${applyColor(Colors.GREEN, equation)}`);

    const eq: IParseEquation = await parseEquation(equation);

    const reduced: Equation[] = eq.isReduced ? eq.splited[0] : await reduceEquation(eq.splited);

    if (reduced.length === 1 && reduced[0].value === 0 && reduced[0].power === 0) {
        console.log('All reals numbers are solutions');

        return;
    }

    const solution: any = await resolveEquation(reduced, eq.isSecondary);

    await displaySolution(equation, solution, eq, reduced);

    console.log(`${applyColor(Colors.MAGENTA, headerDisplay)}`);
}

(async () => {
    const argv: string[] = process.argv;

    if (!argv || argv.length !== 3) throw new Error('invalid equation');

    const polynomial: string = argv[argv.length - 1];

    if (polynomial === 'test') {
        for (const eq of testEquations) await main(eq.equation);
    } else await main(polynomial);

    // await main(polynomial);

    return;
})().catch(handleErrors);
