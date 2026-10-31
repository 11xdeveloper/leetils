import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { determineIfASimpleGraphExists as simpleGraphExists } from ".";

/** Havel-Hakimi: repeatedly connect the largest degree to the next largest ones. */
const byBruteForce = (degrees: number[]): boolean => {
	const d = [...degrees];
	for (;;) {
		d.sort((a, b) => b - a);
		const top = d.shift() ?? 0;
		if (top === 0) return true;
		if (top > d.length) return false;
		for (let i = 0; i < top; i++) {
			d[i] = (d[i] ?? 0) - 1;
			if ((d[i] ?? 0) < 0) return false;
		}
	}
};

describe("3656. Determine if a Simple Graph Exists", () => {
	it("solves the examples from the problem statement", () => {
		expect(simpleGraphExists([3, 1, 2, 2])).toBeTrue();
		expect(simpleGraphExists([1, 3, 3, 1])).toBeFalse();
	});

	it("matches Havel-Hakimi on random degrees", () => {
		const random = createRandom(3656);
		for (let run = 0; run < 500; run++) {
			const degrees = random.array(random.int(1, 8), 0, 7);
			expect(simpleGraphExists(degrees)).toBe(byBruteForce(degrees));
		}
	});
});
