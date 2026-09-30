import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { boatsToSavePeople as numRescueBoats } from ".";

/** Pairs the first person with each possible partner (or nobody), recursively. */
const byBruteForce = (people: number[], limit: number): number => {
	if (people.length === 0) return 0;
	const [first = 0, ...rest] = people;
	let best = 1 + byBruteForce(rest, limit);
	for (const [i, other] of rest.entries()) {
		if (first + other <= limit)
			best = Math.min(
				best,
				1 +
					byBruteForce(
						rest.filter((_, j) => j !== i),
						limit,
					),
			);
	}
	return best;
};

describe("881. Boats to Save People", () => {
	it("solves the examples from the problem statement", () => {
		expect(numRescueBoats([1, 2], 3)).toBe(1);
		expect(numRescueBoats([3, 2, 2, 1], 3)).toBe(3);
		expect(numRescueBoats([3, 5, 3, 4], 5)).toBe(4);
	});

	it("matches trying every pairing on random inputs", () => {
		const random = createRandom(881);
		for (let run = 0; run < 500; run++) {
			const limit = random.int(1, 10);
			const people = random.array(random.int(1, 8), 1, limit);
			expect(numRescueBoats(people, limit)).toBe(byBruteForce(people, limit));
		}
	});
});
