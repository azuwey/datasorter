/**
 * @author David Zarandi (Azuwey)
 */

import { TInput, TInputElement, TOutput, TOutputElement } from './types';

export class Sorter {
	constructor(
		private input: TInput
	) { }

	public get sortedInput(): TInput {
		let _input: TInput = this.input.map(tempInput => {
			tempInput.parentIDs.sort((current: number, next: number) => {
				if (current < next) {
					return -1;
				} else if (current > next) {
					return 1;
				} else {
					return 0;
				}
			});
			return tempInput;
		});
		let _sortedInput: TInput = [];
		_input.reverse().forEach(tempInput => {
			let parents: number[] = tempInput.parentIDs;
			let parentIndex = _sortedInput
				.findIndex(value => parents[parents.length - 1] === value.id);
			if (parentIndex != -1) {
				_sortedInput.splice(parentIndex + 1, 0, tempInput);
			} else {
				let refererIndex = _sortedInput
					.findIndex(value => value.parentIDs.includes(tempInput.id));
				if (refererIndex != -1) {
					_sortedInput.splice(refererIndex, 0, tempInput);
				} else {
					_sortedInput.push(tempInput);
				}
			}
		});
		return _sortedInput;
	}

	public get calculatedTree(): TOutput {
		let _sortedInput: TInput = this.sortedInput;
		let _treeData: TOutput = [];
		_sortedInput.forEach((input: TInputElement) => {
			let vertical = 0;
			let horizontal = 0;
			if (input.parentIDs.length !== 0) {
				let parents: TOutput = _treeData
					.filter(parent => input.parentIDs.includes(parent.input.id));
				parents.sort((current: TOutputElement, next: TOutputElement) => {
					if (current.vertical < next.vertical) {
						return -1;
					} else if (current > next) {
						return 1;
					} else {
						return 0;
					}
				});
				vertical = parents[parents.length - 1].vertical + 1;
				let childCompanions: TOutput = _treeData
					.filter(childCompanion => childCompanion.vertical === vertical)
					.filter(childCompanion => childCompanion.input.parentIDs
						.includes(parents[parents.length - 1].input.id));
				(childCompanions.length > 0) &&
					(horizontal = childCompanions[childCompanions.length - 1].horizontal + 1);
			} else {
				let childCompanions: TOutput = _treeData
					.filter(childCompanion => childCompanion.vertical === vertical);
				(childCompanions.length > 0) &&
					(horizontal = childCompanions[childCompanions.length - 1].horizontal + 1);
			}
			_treeData.push(<TOutputElement>{ input, horizontal, vertical });
		});
		return _treeData;
	}
}