import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { addDigits } from ".";

const byRepeating = (num: number): number => {
	let n = num;
	while (n >= 10) n = [...String(n)].reduce((sum, d) => sum + Number(d), 0);
	return n;
};

describe("258. Add Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(addDigits(38)).toBe(2);
		expect(addDigits(0)).toBe(0);
	});

	it("returns 9, not 0, for positive multiples of 9", () => {
		expect(addDigits(9)).toBe(9);
		expect(addDigits(18)).toBe(9);
	});

	it("matches adding digits repeatedly", () => {
		for (let num = 0; num <= 10_000; num++)
			expect(addDigits(num)).toBe(byRepeating(num));
		const random = createRandom(258);
		for (let run = 0; run < 1000; run++) {
			const num = random.int(0, 2 ** 31 - 1);
			expect(addDigits(num)).toBe(byRepeating(num));
		}
	});
});
