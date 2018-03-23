/**
 * @author David Zarandi (Azuwey)
 */
import { TInput, TOutput } from './types';
export declare class Sorter {
    private input;
    constructor(input: TInput);
    readonly sortedInput: TInput;
    readonly calculatedTree: TOutput;
}
