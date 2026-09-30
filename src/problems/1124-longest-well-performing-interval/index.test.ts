import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestWellPerformingInterval as longestWPI } from ".";

/** Checks every interval. */
const byBruteForce = (hours: number[]): number => {
	let longest = 0;
	for (let i = 0; i < hours.length; i++) {
		let score = 0;
		for (let j = i; j < hours.length; j++) {
			score += (hours[j] ?? 0) > 8 ? 1 : -1;
			if (score > 0) longest = Math.max(longest, j - i + 1);
		}
	}
	return longest;
};

describe("1124. Longest Well-Performing Interval", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestWPI([9, 9, 6, 0, 6, 6, 9])).toBe(3);
		expect(longestWPI([6, 6, 6])).toBe(0);
	});

	it("handles all tiring days", () => {
		expect(longestWPI([9, 16, 12])).toBe(3);
	});

	it("matches checking every interval on random inputs", () => {
		const random = createRandom(1124);
		for (let run = 0; run < 500; run++) {
			const hours = random.array(random.int(1, 30), 6, 11);
			expect(longestWPI(hours)).toBe(byBruteForce(hours));
		}
	});
});
