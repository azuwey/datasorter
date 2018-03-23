/**
 * @author David Zarandi (Azuwey)
 */

import { TInputElement } from './';

export type TOutputElement = {
	input: TInputElement,
	horizontal: number,
	vertical: number
};

export type TOutput = Array<TOutputElement>;