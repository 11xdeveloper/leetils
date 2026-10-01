import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToSplitAString as numWays } from ".";

/** Tries every pair of cuts. */
const byBruteForce = (s: string): number => {
	const ones = (t: string) => t.split("1").length - 1;
	let count = 0;
	for (let i = 1; i < s.length; i++) {
		for (let j = i + 1; j < s.length; j++) {
			const [a, b, c] = [
				ones(s.slice(0, i)),
				ones(s.slice(i, j)),
				ones(s.slice(j)),
			];
			if (a === b && b === c) count++;
		}
	}
	return count;
};

describe("1573. Number of Ways to Split a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(numWays("10101")).toBe(4);
		expect(numWays("1001")).toBe(0);
		expect(numWays("0000")).toBe(3);
	});

	it("reduces modulo 10^9 + 7 for long strings of zeros", () => {
		expect(numWays("0".repeat(100000))).toBe(
			Number(((99999n * 99998n) / 2n) % 1_000_000_007n),
		);
	});

	it("matches trying every pair of cuts on random inputs", () => {
		const random = createRandom(1573);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(3, 14), "001");
			expect(numWays(s)).toBe(byBruteForce(s));
		}
	});
});
