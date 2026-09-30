import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numbersAtMostNGivenDigitSet as atMostNGivenDigitSet } from ".";

describe("902. Numbers At Most N Given Digit Set", () => {
	it("solves the examples from the problem statement", () => {
		expect(atMostNGivenDigitSet(["1", "3", "5", "7"], 100)).toBe(20);
		expect(atMostNGivenDigitSet(["1", "4", "9"], 1000000000)).toBe(29523);
		expect(atMostNGivenDigitSet(["7"], 8)).toBe(1);
	});

	it("matches checking every number on random inputs", () => {
		const random = createRandom(902);
		for (let run = 0; run < 300; run++) {
			const digits = [
				...new Set(random.string(random.int(1, 4), "123456789")),
			].sort();
			const n = random.int(1, 5000);
			let expected = 0;
			for (let x = 1; x <= n; x++)
				if ([...String(x)].every((digit) => digits.includes(digit))) expected++;
			expect(atMostNGivenDigitSet(digits, n)).toBe(expected);
		}
	});
});
