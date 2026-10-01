import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { candy } from ".";

/** Starts everyone at 1 and raises counts until every rule holds. */
const byRelaxation = (ratings: number[]): number => {
	const candies = ratings.map(() => 1);
	for (let changed = true; changed; ) {
		changed = false;
		for (const [i, rating] of ratings.entries()) {
			for (const j of [i - 1, i + 1]) {
				if (j < 0 || j >= ratings.length) continue;
				if (
					rating > (ratings[j] ?? 0) &&
					(candies[i] ?? 0) <= (candies[j] ?? 0)
				) {
					candies[i] = (candies[j] ?? 0) + 1;
					changed = true;
				}
			}
		}
	}
	return candies.reduce((sum, count) => sum + count, 0);
};

describe("135. Candy", () => {
	it("solves the examples from the problem statement", () => {
		expect(candy([1, 0, 2])).toBe(5);
		expect(candy([1, 2, 2])).toBe(4);
	});

	it("gives equal neighbours no extra candy", () => {
		expect(candy([3, 3, 3])).toBe(3);
	});

	it("handles peaks that need candy from both sides", () => {
		expect(candy([1, 3, 4, 5, 2])).toBe(11);
	});

	it("matches raising counts until every rule holds on random inputs", () => {
		const random = createRandom(135);
		for (let run = 0; run < 500; run++) {
			const ratings = random.array(random.int(1, 15), 0, 5);
			expect(candy(ratings)).toBe(byRelaxation(ratings));
		}
	});
});
