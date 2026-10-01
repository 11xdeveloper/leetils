import { describe, expect, it } from "bun:test";
import { smallestGreaterMultipleMadeOfTwoDigits as findInteger } from ".";

describe("1999. Smallest Greater Multiple Made of Two Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(findInteger(2, 0, 2)).toBe(20);
		expect(findInteger(3, 4, 2)).toBe(24);
		expect(findInteger(2, 0, 0)).toBe(-1);
	});

	it("matches checking multiples in order for small k", () => {
		for (let k = 1; k <= 30; k++) {
			for (const [d1, d2] of [
				[1, 0],
				[3, 7],
				[5, 5],
				[9, 2],
			] as const) {
				let expected = -1;
				for (let m = 2 * k; m <= 200000; m += k) {
					if (
						[...String(m)].every((c) => c === String(d1) || c === String(d2))
					) {
						expected = m;
						break;
					}
				}
				if (expected !== -1) expect(findInteger(k, d1, d2)).toBe(expected);
			}
		}
	});
});
