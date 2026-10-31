import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestDivisibleDigitProductII as smallestNumber } from ".";

/** Counts up from num. */
const byBruteForce = (num: string, t: number): string => {
	if (
		[2, 3, 5, 7].reduce((rest, p) => {
			while (rest % p === 0) rest /= p;
			return rest;
		}, t) !== 1
	)
		return "-1";
	for (let candidate = Number(num); ; candidate++) {
		const digits = String(candidate);
		if (digits.includes("0")) continue;
		if (
			[...digits].reduce((product, d) => (product * Number(d)) % t, 1) === 0 ||
			t === 1
		)
			return digits;
	}
};

describe("3348. Smallest Divisible Digit Product II", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestNumber("1234", 256)).toBe("1488");
		expect(smallestNumber("12355", 50)).toBe("12355");
		expect(smallestNumber("11111", 26)).toBe("-1");
	});

	it("matches counting up on random inputs", () => {
		const random = createRandom(3348);
		for (let run = 0; run < 400; run++) {
			const num = String(random.int(1, 99999));
			const t =
				[
					1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 14, 18, 24, 27, 32, 35, 36, 49, 64,
					72, 81, 96, 128, 210,
				][random.int(0, 23)] ?? 1;
			expect(smallestNumber(num, t)).toBe(byBruteForce(num, t));
		}
	});

	it("handles huge inputs", () => {
		const result = smallestNumber(`${"9".repeat(1000)}`, 2 ** 40);
		expect(result.length).toBe(1001);
	});
});
