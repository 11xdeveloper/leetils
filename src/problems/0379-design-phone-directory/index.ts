/**
 * 379. Design Phone Directory
 *
 * Hands out numbers from 0 to `maxNumbers - 1`: `get` assigns any free
 * number (or -1 if none are free), `check` says whether a number is free,
 * and `release` frees a number again.
 *
 * Keeps a stack of free numbers and a flag per number, so every operation
 * is O(1). Releasing a number that's already free is ignored, so it can't
 * be handed out twice.
 *
 * @see https://leetcode.com/problems/design-phone-directory/
 * @difficulty Medium
 * @timeComplexity O(maxNumbers) to build, O(1) per operation
 * @spaceComplexity O(maxNumbers)
 *
 * @example
 * const directory = new DesignPhoneDirectory(3);
 * directory.get(); // a free number, like 0
 * directory.check(2); // true
 */
export class DesignPhoneDirectory {
	readonly #free: number[];
	readonly #isFree: boolean[];

	constructor(maxNumbers: number) {
		this.#free = Array.from(
			{ length: maxNumbers },
			(_, i) => maxNumbers - 1 - i,
		);
		this.#isFree = new Array<boolean>(maxNumbers).fill(true);
	}

	/** Assigns and returns a free number, or -1 if there are none. */
	get(): number {
		const number = this.#free.pop();
		if (number === undefined) return -1;
		this.#isFree[number] = false;
		return number;
	}

	check(number: number): boolean {
		return this.#isFree[number] ?? false;
	}

	release(number: number): void {
		if (this.#isFree[number] !== false) return;
		this.#isFree[number] = true;
		this.#free.push(number);
	}
}
