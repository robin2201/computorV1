import { Equation } from "./parse";

async function checkValues(splited: Equation[][]): Promise<any> {
    const [ left, right ] = splited;

    if (left[0].power === right[0].power) {
        if (left[0].value !== right[0].value) throw new Error('Inéquation');

        return true;
    }
}

export async function reduceEquation(splited: Equation[][]): Promise<Equation[]> {
    const re: Equation[] = [];

    if (splited[0].length === 1 && splited[1].length === 1) {
        if (await checkValues(splited)) return [{ value: 0, power: 0 }];
    }

    const left: Equation[] = await reduceEq(splited[0]);
    const right: Equation[] = await reduceEq(splited[1]);

    for (const rightEq of right) {

        const leftEq: Equation = left.find(i => i.power === rightEq.power);

        if (leftEq) {

            let v: number;

            v = leftEq.value + (rightEq.value * -1);

            re.push({
                value: v,
                power: leftEq.power
            })

        } else re.push(rightEq);

    }

    left.forEach(i => {
        if (!re.find(r => r.power === i.power)) re.push(i);
    });

    return re.sort((a, b) => b.value - a.value);
}


async function reduceEq(eq: Equation[]): Promise<any> {
    const res: Equation[] = [];

    for (const e of eq) {

        const hasSamePower: Equation = eq.find(equ => equ.power === e.power && equ.value !== e.value);

        if (hasSamePower) {

            const newValue: Equation = {
                value: e.value + hasSamePower.value,
                power: e.power
            };

            if (!res.find(equ => equ.power === newValue.power && equ.value === newValue.value)) res.push(newValue);

        } else {
            res.push(e);
        }
    }

    return res;
}