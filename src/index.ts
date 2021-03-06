import { parseEquation, IParseEquation, Equation } from "./parse";
import { reduceEquation } from "./reduce";
import { resolveEquation } from "./resolve";
import {displaySolution, equationArrayAsString} from "./display";
import { handleErrors } from "./errors";
import { Colors, applyColor } from "./display";

async function main(equation: string): Promise<void> {

    let headerDisplay = '';

    for (let i = 0; i < equation.length + 10; i++) headerDisplay +='#';

    console.log(`${applyColor(Colors.MAGENTA, headerDisplay)}`);

    console.log(`Equation: ${applyColor(Colors.GREEN, equation)}`);

    const eq: IParseEquation = await parseEquation(equation);

    const reduced: Equation[] =  await reduceEquation(eq.splited);

    if (reduced.length === 1 && reduced[0].value === 0 && reduced[0].power === 0) {
        console.log('All reals numbers are solutions');

        return;
    }

    if (eq.degre >= 0 && eq.degre <= 2) {

        const solution: any = await resolveEquation(reduced, eq.isSecondary);
        await displaySolution(equation, eq, reduced, solution);
    } else {

        await displaySolution(equation, eq, reduced);
        console.log(`${applyColor(Colors.RED, `The polynomial degree is stricly greater than 2, I can't solve.`)}`)
    }


    console.log(`${applyColor(Colors.MAGENTA, headerDisplay)}`);
}

(async () => {
    const argv: string[] = process.argv;

    if (!argv || argv.length !== 3) throw new Error('Please enter an equation as argv');

    const polynomial: string = argv[argv.length - 1];

    await main(polynomial);

    return;
})().catch(handleErrors);
