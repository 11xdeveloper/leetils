import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfGroupsToCreateAValidAssignment as minGroupsForValidAssignment } from ".";

/** Tries every pair of box sizes. */
const byBruteForce = (balls: number[]): number => {
	const counts = new Map<number, number>();
	for (const b of balls) counts.set(b, (counts.get(b) ?? 0) + 1);
	let best = balls.length;
	for (let s = 1; s <= balls.length; s++) {
		let total = 0;
		let ok = true;
		for (const c of counts.values()) {
			let fewest = Number.POSITIVE_INFINITY;
			for (let big = 0; big * (s + 1) <= c; big++)
				if ((c - big * (s + 1)) % s === 0)
					fewest = Math.min(fewest, big + (c - big * (s + 1)) / s);
			if (fewest === Number.POSITIVE_INFINITY) ok = false;
			else total += fewest;
		}
		if (ok) best = Math.min(best, total);
	}
	return best;
};

describe("2910. Minimum Number of Groups to Create a Valid Assignment", () => {
	it("solves the examples from the problem statement", () => {
		expect(minGroupsForValidAssignment([3, 2, 3, 2, 3])).toBe(2);
		expect(minGroupsForValidAssignment([10, 10, 10, 3, 1, 1])).toBe(4);
	});

	it("matches trying every box size on random inputs", () => {
		const random = createRandom(2910);
		for (let run = 0; run < 300; run++) {
			const balls = random.array(random.int(1, 20), 1, 4);
			expect(minGroupsForValidAssignment(balls)).toBe(byBruteForce(balls));
		}
	});
});
