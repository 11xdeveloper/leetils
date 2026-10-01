import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { monotoneIncreasingDigits } from ".";

const isMonotone = (value: number): boolean =>
	[...String(value)].every(
		(digit, i, all) => i === 0 || (all[i - 1] ?? "") <= digit,
	);

describe("738. Monotone Increasing Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(monotoneIncreasingDigits(10)).toBe(9);
		expect(monotoneIncreasingDigits(1234)).toBe(1234);
		expect(monotoneIncreasingDigits(332)).toBe(299);
	});

	it("matches counting down for every n up to 20,000", () => {
		let best = 0;
		for (let n = 0; n <= 20_000; n++) {
			if (isMonotone(n)) best = n;
			expect(monotoneIncreasingDigits(n)).toBe(best);
		}
	});

	it("gives a monotone number no larger than n on random large inputs", () => {
		const random = createRandom(738);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(0, 10 ** 9);
			const result = monotoneIncreasingDigits(n);
			expect(result).toBeLessThanOrEqual(n);
			expect(isMonotone(result)).toBeTrue();
			for (
				let candidate = result + 1;
				candidate <= Math.min(n, result + 50);
				candidate++
			)
				expect(isMonotone(candidate)).toBeFalse();
		}
	});
});
