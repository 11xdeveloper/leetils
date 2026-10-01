import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nonNegativeIntegersWithoutConsecutiveOnes as findIntegers } from ".";

const byCounting = (n: number): number => {
	let count = 0;
	for (let i = 0; i <= n; i++) if ((i & (i >> 1)) === 0) count++;
	return count;
};

describe("600. Non-negative Integers without Consecutive Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(findIntegers(5)).toBe(5);
		expect(findIntegers(1)).toBe(2);
		expect(findIntegers(2)).toBe(3);
	});

	it("matches checking every number up to 5,000", () => {
		for (let n = 1; n <= 5000; n++) expect(findIntegers(n)).toBe(byCounting(n));
	});

	it("matches checking every number for random larger inputs", () => {
		const random = createRandom(600);
		for (let run = 0; run < 20; run++) {
			const n = random.int(1, 10 ** 6);
			expect(findIntegers(n)).toBe(byCounting(n));
		}
		// Every valid number below 2^30 is at most 0b1010…10 = 715,827,882, so all F(32) of them count.
		expect(findIntegers(10 ** 9)).toBe(2178309);
	});
});
