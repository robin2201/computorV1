export interface Equation {
    value: number;
    power: number;
}

export interface IParseEquation {
    splited: Equation[][];
    isReduced: boolean;
    isSecondary?: boolean;
    degre?: number;
}

export async function parseEquation(equation: string): Promise<IParseEquation> {
    const tmpParts: string[] = equation.split('=');

    if (!tmpParts || tmpParts.length !== 2) throw new Error('Invalid expression');

    if (!tmpParts[0] || !tmpParts[1]) throw new Error('Invalid expression');

    const parts: string[] = tmpParts.map(i => i.trim());

    const splited: Equation[][] = [];

    for (const p of parts) splited.push(await splitEquation(p));

    const isSecondary: boolean = !!splited[0].find(i => i.power === 2) || !!splited[1].find(i => i.power === 2);

    return { splited, isReduced: parts[1] === '0', isSecondary };
}

async function splitEquation(equation: string): Promise<Equation[]> {

    if (equation.length === 1) {

        const value: number = +equation;

        if (isNaN(value)) throw new Error('Invalid value, only digit values are accepted');

        return [ { value, power: 0 } ];
    }

    const eqParts: Equation[] = [];
    let i: number = 0;

    for (let cp = 0; cp <= equation.length; cp++) {

        if (equation[cp] === '+' || equation[cp] === '-' && cp > 0) {

            if (equation[cp - 1] === '^') {
                throw new Error('Power cannot be negative!')
            }
            const p: string = equation.slice(i, cp);

            eqParts.push(await splitPartEquation(p));
            i = cp;
        }
    }

    const last: string = equation.slice(i, equation.length);

    eqParts.push(await splitPartEquation(last));

    return eqParts;
}

async function splitPartEquation(part: string): Promise<Equation> {

    if (!part.includes('*')) {
        const value: number = +part.replace(' ', '');

        if (isNaN(value)) throw new Error('Invalid value, only digit values are accepted');

        return { value, power: 0 };
    }

    const [ left, right ]: string[] = part.split('*').map(i => i.trim());

    const value: number = +left.replace(' ', '');

    if (isNaN(value)) throw new Error('Invalid value, only digit values are accepted');

    const power: number = +(right.split('^')[1]);

    if (isNaN(power)) throw new Error('Invalid power value, only digit values are accepted');
    if (power < 0) throw new Error(`Can't solve equation with negative power`);
    if (power > 2) throw new Error(`Can't solve equation with degree ${power}`);

    return { value, power }
}
