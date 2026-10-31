import { describe, expect, it } from "bun:test";
import { sumOfKDigitNumbersInARange as sumOfNumbers } from ".";

describe("3855. Sum of K-Digit Numbers in a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfNumbers(1, 2, 2)).toBe(66);
		expect(sumOfNumbers(0, 1, 3)).toBe(444);
		expect(sumOfNumbers(5, 5, 10)).toBe(555555520);
	});

	it("matches adding every number for small k", () => {
		for (let l = 0; l <= 9; l++)
			for (let r = l; r <= 9; r++)
				for (let k = 1; k <= 3; k++) {
					let total = 0;
					for (let x = 0; x < 10 ** k; x++)
						if (
							[...String(x).padStart(k, "0")].every(
								(d) => Number(d) >= l && Number(d) <= r,
							)
						)
							total += x;
					expect(sumOfNumbers(l, r, k)).toBe(total % 1_000_000_007);
				}
	});
});
