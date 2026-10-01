/**
 * 398. Random Pick Index
 *
 * Built from an array that may contain duplicates, returns a uniformly
 * random index at which a given target appears. The target always appears.
 *
 * Reservoir sampling over the array on each call: the `i`th match replaces
 * the pick so far with probability `1 / i`, leaving every matching index
 * equally likely without storing indices. `random` is the source of
 * randomness, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/random-pick-index/
 * @difficulty Medium
 * @timeComplexity O(n) per pick
 * @spaceComplexity O(1)
 *
 * @example
 * const picker = new RandomPickIndex([1, 2, 3, 3, 3]);
 * picker.pick(3); // 2, 3 or 4, each with probability 1/3
 */
export class RandomPickIndex {
	readonly #nums: readonly number[];
	readonly #random: () => number;

	constructor(nums: readonly number[], random: () => number = Math.random) {
		this.#nums = nums;
		this.#random = random;
	}

	pick(target: number): number {
		let chosen = -1;
		let matches = 0;
		for (const [i, num] of this.#nums.entries()) {
			if (num !== target) continue;
			matches++;
			if (this.#random() * matches < 1) chosen = i;
		}
		return chosen;
	}
}
