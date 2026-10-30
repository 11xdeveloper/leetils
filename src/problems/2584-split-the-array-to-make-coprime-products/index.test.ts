import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitTheArrayToMakeCoprimeProducts as findValidSplit } from ".";

/** Compares prime sets on each side of every split. */
const byBruteForce = (nums: number[]): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	for (let i = 0; i < nums.length - 1; i++)
		if (
			nums
				.slice(0, i + 1)
				.every((a) => nums.slice(i + 1).every((b) => gcd(a, b) === 1))
		)
			return i;
	return -1;
};

describe("2584. Split the Array to Make Coprime Products", () => {
	it("solves the examples from the problem statement", () => {
		expect(findValidSplit([4, 7, 8, 15, 3, 5])).toBe(2);
		expect(findValidSplit([4, 7, 15, 8, 3, 5])).toBe(-1);
	});

	it("matches checking every split on random inputs", () => {
		const random = createRandom(2584);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 40);
			expect(findValidSplit(nums)).toBe(byBruteForce(nums));
		}
	});
});
