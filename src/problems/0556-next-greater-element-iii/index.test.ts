import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nextGreaterElementIII as nextGreaterElement } from ".";

/** Counts up until a number with the same digits appears. */
const bySearch = (n: number): number => {
	const sorted = [...String(n)].sort().join("");
	const limit = Number([...sorted].reverse().join(""));
	for (let candidate = n + 1; candidate <= limit; candidate++) {
		if ([...String(candidate)].sort().join("") === sorted) return candidate;
	}
	return -1;
};

describe("556. Next Greater Element III", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextGreaterElement(12)).toBe(21);
		expect(nextGreaterElement(21)).toBe(-1);
	});

	it("returns -1 when the answer overflows 32 bits", () => {
		expect(nextGreaterElement(2147483476)).toBe(2147483647);
		expect(nextGreaterElement(2147483486)).toBe(-1);
		expect(nextGreaterElement(1999999999)).toBe(-1);
	});

	it("matches counting up on random inputs", () => {
		const random = createRandom(556);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 99_999);
			expect(nextGreaterElement(n)).toBe(bySearch(n));
		}
	});
});
