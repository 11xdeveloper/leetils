/**
 * 497. Random Point in Non-overlapping Rectangles
 *
 * Built from non-overlapping axis-aligned rectangles `[x1, y1, x2, y2]`,
 * `pick` returns a uniformly random integer point covered by one of them
 * (their edges included).
 *
 * Every integer point must be equally likely, so each rectangle is weighted
 * by how many it covers. A random number below the total picks a point by
 * index: binary search over the running totals finds its rectangle, and the
 * remainder its position inside. `random` is the source of randomness,
 * `Math.random` by default.
 *
 * @see https://leetcode.com/problems/random-point-in-non-overlapping-rectangles/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(log n) per pick
 * @spaceComplexity O(n)
 *
 * @example
 * const picker = new RandomPointInNonOverlappingRectangles([[-2, -2, 1, 1], [2, 2, 4, 6]]);
 * picker.pick(); // e.g. [1, -2]
 */
export class RandomPointInNonOverlappingRectangles {
	readonly #rects: readonly (readonly number[])[];
	readonly #totals: number[] = [];
	readonly #random: () => number;

	constructor(
		rects: readonly (readonly number[])[],
		random: () => number = Math.random,
	) {
		this.#rects = rects;
		this.#random = random;
		let total = 0;
		for (const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] of rects) {
			total += (x2 - x1 + 1) * (y2 - y1 + 1);
			this.#totals.push(total);
		}
	}

	pick(): number[] {
		const index = Math.floor(this.#random() * (this.#totals.at(-1) ?? 0));
		let low = 0;
		let high = this.#totals.length - 1;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((this.#totals[mid] ?? 0) <= index) low = mid + 1;
			else high = mid;
		}

		const [x1 = 0, y1 = 0, x2 = 0] = this.#rects[low] ?? [];
		const offset = index - (this.#totals[low - 1] ?? 0);
		const width = x2 - x1 + 1;
		return [x1 + (offset % width), y1 + Math.floor(offset / width)];
	}
}
