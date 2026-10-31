import { describe, expect, it } from "bun:test";
import { countKReducibleNumbersLessThanN as countKReducibleNumbers } from ".";

/** Reduces every number below n. */
const byBruteForce = (s: string, k: number): number => {
	const n = Number.parseInt(s, 2);
	let count = 0;
	for (let x = 1; x < n; x++) {
		let value = x;
		let steps = 0;
		while (value !== 1 && steps < k) {
			value = value.toString(2).replaceAll("0", "").length;
			steps++;
		}
		if (value === 1) count++;
	}
	return count;
};

describe("3352. Count K-Reducible Numbers Less Than N", () => {
	it("solves the examples from the problem statement", () => {
		expect(countKReducibleNumbers("111", 1)).toBe(3);
		expect(countKReducibleNumbers("1000", 2)).toBe(6);
		expect(countKReducibleNumbers("1", 3)).toBe(0);
	});

	it("matches reducing every number", () => {
		for (let n = 1; n <= 300; n++)
			for (let k = 1; k <= 4; k++)
				expect(countKReducibleNumbers(n.toString(2), k)).toBe(
					byBruteForce(n.toString(2), k),
				);
	});
});
