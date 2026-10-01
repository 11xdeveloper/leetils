/**
 * 710. Random Pick with Blacklist
 *
 * Built from `n` and a list of blacklisted integers in `[0, n)`, `pick`
 * returns a uniformly random integer in `[0, n)` that isn't blacklisted,
 * calling the random source once per pick.
 *
 * With `w` allowed numbers, it picks uniformly from `[0, w)`. Blacklisted
 * numbers in that range are mapped once, up front, to the allowed numbers
 * in `[w, n)`, which there are exactly enough of. `random` is the source of
 * randomness, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/random-pick-with-blacklist/
 * @difficulty Hard
 * @timeComplexity O(b) to build for b blacklisted numbers, O(1) per pick
 * @spaceComplexity O(b)
 *
 * @example
 * const picker = new RandomPickWithBlacklist(7, [2, 3, 5]);
 * picker.pick(); // 0, 1, 4 or 6
 */
export class RandomPickWithBlacklist {
	readonly #allowed: number;
	readonly #remap = new Map<number, number>();
	readonly #random: () => number;

	constructor(
		n: number,
		blacklist: readonly number[],
		random: () => number = Math.random,
	) {
		this.#allowed = n - blacklist.length;
		this.#random = random;

		const blocked = new Set(blacklist);
		let spare = this.#allowed;
		for (const number of blacklist) {
			if (number >= this.#allowed) continue;
			while (blocked.has(spare)) spare++;
			this.#remap.set(number, spare);
			spare++;
		}
	}

	pick(): number {
		const choice = Math.floor(this.#random() * this.#allowed);
		return this.#remap.get(choice) ?? choice;
	}
}
