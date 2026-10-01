import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToSeparateNumbers as numberOfCombinations } from ".";

/** Tries every split, comparing numbers as BigInt. */
const byBruteForce = (num: string): number => {
	const count = (start: number, previous: bigint): number => {
		if (start === num.length) return 1;
		if (num[start] === "0") return 0;
		let total = 0;
		for (let end = start + 1; end <= num.length; end++) {
			const value = BigInt(num.slice(start, end));
			if (value >= previous) total += count(end, value);
		}
		return total;
	};
	return count(0, 0n);
};

describe("1977. Number of Ways to Separate Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfCombinations("327")).toBe(2);
		expect(numberOfCombinations("094")).toBe(0);
		expect(numberOfCombinations("0")).toBe(0);
	});

	it("matches trying every split on random strings", () => {
		const random = createRandom(1977);
		for (let run = 0; run < 300; run++) {
			const num = random.string(random.int(1, 12), "01123");
			expect(numberOfCombinations(num)).toBe(byBruteForce(num));
		}
	});

	it("handles long strings", () => {
		expect(numberOfCombinations("1".repeat(3500))).toBeLessThan(1_000_000_007);
	});
});
