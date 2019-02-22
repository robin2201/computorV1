import { Colors, applyColor } from "./display";

export async function handleErrors(e: Error): Promise<void> {
    console.log(applyColor(Colors.RED, e.message));

    return;
}