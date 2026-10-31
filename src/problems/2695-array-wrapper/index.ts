/**
 * 2695. Array Wrapper
 *
 * Wrap an array of numbers so that adding two wrappers with `+` gives the
 * sum of all their elements, and `String(wrapper)` gives the array in
 * brackets, like `"[1,2]"`.
 *
 * Implement `valueOf` as the sum and `toString` as the bracketed list.
 *
 * @see https://leetcode.com/problems/array-wrapper/
 * @difficulty Easy
 * @timeComplexity O(n) per conversion
 * @spaceComplexity O(n)
 *
 * @example
 * Number(new ArrayWrapper([1, 2])) + Number(new ArrayWrapper([3, 4])); // 10
 * String(new ArrayWrapper([23, 98, 42, 70])); // "[23,98,42,70]"
 */
export class ArrayWrapper {
	readonly #nums: readonly number[];

	constructor(nums: readonly number[]) {
		this.#nums = nums;
	}

	valueOf(): number {
		let sum = 0;
		for (const num of this.#nums) sum += num;
		return sum;
	}

	toString(): string {
		return `[${this.#nums.join(",")}]`;
	}
}
