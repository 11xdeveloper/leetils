import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { allocateMailboxes as minDistance } from ".";

/** Tries every set of k mailbox positions among the house positions. */
const byBruteForce = (houses: number[], k: number): number => {
	const spots = [...new Set(houses)];
	let best = Infinity;
	for (let mask = 1; mask < 2 ** spots.length; mask++) {
		const boxes = spots.filter((_, i) => mask & (1 << i));
		if (boxes.length > k) continue;
		best = Math.min(
			best,
			houses.reduce(
				(sum, h) => sum + Math.min(...boxes.map((b) => Math.abs(b - h))),
				0,
			),
		);
	}
	return best;
};

describe("1478. Allocate Mailboxes", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDistance([1, 4, 8, 10, 20], 3)).toBe(5);
		expect(minDistance([2, 3, 5, 12, 18], 2)).toBe(9);
	});

	it("needs no walking with a mailbox per house", () => {
		expect(minDistance([7, 1, 4], 3)).toBe(0);
	});

	it("matches trying every placement on random streets", () => {
		const random = createRandom(1478);
		for (let run = 0; run < 200; run++) {
			const houses = [...new Set(random.array(random.int(1, 9), 1, 40))];
			const k = random.int(1, houses.length);
			expect(minDistance(houses, k)).toBe(byBruteForce(houses, k));
		}
	});
});
