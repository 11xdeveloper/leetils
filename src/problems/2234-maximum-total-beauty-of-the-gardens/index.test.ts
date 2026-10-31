import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalBeautyOfTheGardens as maximumBeauty } from ".";

/** Tries every way to plant the new flowers. */
const byBruteForce = (
	flowers: number[],
	newFlowers: number,
	target: number,
	full: number,
	partial: number,
): number => {
	let best = 0;
	const plant = (i: number, left: number, gardens: number[]): void => {
		if (i === flowers.length) {
			const incomplete = gardens.filter((f) => f < target);
			const beauty =
				(gardens.length - incomplete.length) * full +
				(incomplete.length ? Math.min(...incomplete) * partial : 0);
			best = Math.max(best, beauty);
			return;
		}
		for (let add = 0; add <= left; add++)
			plant(i + 1, left - add, [...gardens, (flowers[i] ?? 0) + add]);
	};
	plant(0, newFlowers, []);
	return best;
};

describe("2234. Maximum Total Beauty of the Gardens", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumBeauty([1, 3, 1, 1], 7, 6, 12, 1)).toBe(14);
		expect(maximumBeauty([2, 4, 5, 3], 10, 5, 2, 6)).toBe(30);
	});

	it("matches trying every planting on random gardens", () => {
		const random = createRandom(2234);
		for (let run = 0; run < 200; run++) {
			const flowers = random.array(random.int(1, 4), 1, 8);
			const newFlowers = random.int(0, 6);
			const target = random.int(1, 7);
			const [full, partial] = [random.int(1, 10), random.int(1, 10)];
			expect(maximumBeauty(flowers, newFlowers, target, full, partial)).toBe(
				byBruteForce(flowers, newFlowers, target, full, partial),
			);
		}
	});
});
