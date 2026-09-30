import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { closestDivisors } from ".";

/** The smallest gap among every factor pair of num + 1 and num + 2. */
const smallestGap = (num: number): number => {
	let best = Infinity;
	for (const target of [num + 1, num + 2]) {
		for (let a = 1; a * a <= target; a++)
			if (target % a === 0) best = Math.min(best, target / a - a);
	}
	return best;
};

describe("1362. Closest Divisors", () => {
	it("solves the examples from the problem statement", () => {
		expect(closestDivisors(8)).toEqual([3, 3]);
		expect(closestDivisors(123).sort((a, b) => a - b)).toEqual([5, 25]);
		expect(closestDivisors(999).sort((a, b) => a - b)).toEqual([25, 40]);
	});

	it("finds a closest pair on random inputs, up to 10^9", () => {
		const random = createRandom(1362);
		for (let run = 0; run < 300; run++) {
			const num = run < 250 ? random.int(1, 5000) : random.int(1, 10 ** 9);
			const [a = 0, b = 0] = closestDivisors(num);
			expect([num + 1, num + 2]).toContain(a * b);
			expect(Math.abs(b - a)).toBe(smallestGap(num));
		}
	});
});
