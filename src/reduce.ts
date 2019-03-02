import { Equation } from "./parse";

async function checkValues(left: Equation[], right: Equation[]): Promise<any> {

    if (left[0].power === right[0].power) {
        if (left[0].value !== right[0].value) throw new Error('Inéquation');

        return true;
    }
}

export async function reduceEquation(splited: Equation[][]): Promise<Equation[]> {
    const re: Equation[] = [];

    const left: Equation[] = splited[0].length > 1 ? await reduceEq(splited[0]) : splited[0];
    const right: Equation[] = splited[1].length > 1 ?  await reduceEq(splited[1]) : splited[1];

    if (left.length === 1 && right.length === 1) {
        if (await checkValues(left, right)) return [{ value: 0, power: 0 }];
    }

    for (const rightEq of right) {

        const leftEq: Equation = left.find(i => i.power === rightEq.power);

        if (leftEq) {

            let v: number;

            v = leftEq.value + (rightEq.value * -1);

            re.push({
                value: v,
                power: leftEq.power
            })

        } else {
            re.push({
                value: rightEq.value * -1,
                power: rightEq.power
            })
        }

    }

    left.forEach(i => {
        if (!re.find(r => r.power === i.power)) re.push(i);
    });

    return re.sort((a, b) => b.value - a.value);
}


async function reduceEq(eq: Equation[]): Promise<Equation[]> {
    const res: Equation[] = [];

    for (const e of eq) {

        if (res && res.length) {

            let update: boolean = false;

            for (let final of res) {
                if (final.power === e.power) {
                    final.value += e.value;
                    update = true;
                }

            }

            if (!update) res.push(e);

        } else res.push(e);
    }

    return res;
}