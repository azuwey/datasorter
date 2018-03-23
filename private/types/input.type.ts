/**
 * @author David Zarandi (Azuwey)
 */

export type TInputElement = {
	id: number,
	label: string,
	parentIDs: number[]
};

export type TInput = Array<TInputElement>;