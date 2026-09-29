/**
 * 528. Random Pick with Weight
 *
 * Built from positive weights `w`, `pickIndex` returns index `i` with
 * probability `w[i] / sum(w)`.
 *
 * Lays the weights end to end as running totals, picks a random point
 * along them, and binary searches for the index whose stretch contains it.
 * `random` is the source of randomness, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/random-pick-with-weight/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(log n) per pick
 * @spaceComplexity O(n)
 *
 * @example
 * const picker = new RandomPickWithWeight([1, 3]);
 * picker.pickIndex(); // 1 with probability 3/4, 0 with probability 1/4
 */
export class RandomPickWithWeight {
	readonly #totals: number[] = [];
	readonly #random: () => number;

	constructor(w: readonly number[], random: () => number = Math.random) {
		this.#random = random;
		let total = 0;
		for (const weight of w) {
			total += weight;
			this.#totals.push(total);
		}
	}

	pickIndex(): number {
		const point = this.#random() * (this.#totals.at(-1) ?? 0);
		let low = 0;
		let high = this.#totals.length - 1;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((this.#totals[mid] ?? 0) <= point) low = mid + 1;
			else high = mid;
		}
		return low;
	}
}
