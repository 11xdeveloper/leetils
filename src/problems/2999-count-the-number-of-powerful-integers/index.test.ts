import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfPowerfulIntegers as numberOfPowerfulInt } from ".";

/** Checks every integer in the range. */
const byBruteForce = (
	start: number,
	finish: number,
	limit: number,
	s: string,
): number => {
	let count = 0;
	for (let x = start; x <= finish; x++) {
		const digits = String(x);
		if (digits.endsWith(s) && [...digits].every((d) => Number(d) <= limit))
			count++;
	}
	return count;
};

describe("2999. Count the Number of Powerful Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfPowerfulInt(1, 6000, 4, "124")).toBe(5);
		expect(numberOfPowerfulInt(15, 215, 6, "10")).toBe(2);
		expect(numberOfPowerfulInt(1000, 2000, 4, "3000")).toBe(0);
	});

	it("matches checking every integer on random ranges", () => {
		const random = createRandom(2999);
		for (let run = 0; run < 300; run++) {
			const limit = random.int(1, 9);
			const s = String(random.int(1, 10 ** random.int(1, 2) - 1)).replace(
				/\d/g,
				(d) => String(Math.min(Number(d), limit)),
			);
			const start = random.int(1, 3000);
			const finish = random.int(start, 6000);
			expect(numberOfPowerfulInt(start, finish, limit, s)).toBe(
				byBruteForce(start, finish, limit, s),
			);
		}
	});

	it("handles huge ranges", () => {
		expect(numberOfPowerfulInt(1, 1_000_000_000_000_000, 9, "1")).toBe(
			100_000_000_000_000,
		);
	});
});
