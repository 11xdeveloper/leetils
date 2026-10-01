import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { editDistance } from ".";

/** Tries every edit at the first differing position. */
const byRecursion = (a: string, b: string): number => {
	if (a === "") return b.length;
	if (b === "") return a.length;
	if (a[0] === b[0]) return byRecursion(a.slice(1), b.slice(1));
	return (
		1 +
		Math.min(
			byRecursion(a.slice(1), b.slice(1)),
			byRecursion(a.slice(1), b),
			byRecursion(a, b.slice(1)),
		)
	);
};

describe("72. Edit Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(editDistance("horse", "ros")).toBe(3);
		expect(editDistance("intention", "execution")).toBe(5);
	});

	it("handles empty words", () => {
		expect(editDistance("", "")).toBe(0);
		expect(editDistance("abc", "")).toBe(3);
		expect(editDistance("", "abc")).toBe(3);
	});

	it("is 0 for equal words and symmetric", () => {
		expect(editDistance("same", "same")).toBe(0);
		expect(editDistance("kitten", "sitting")).toBe(
			editDistance("sitting", "kitten"),
		);
	});

	it("matches trying every edit on random inputs", () => {
		const random = createRandom(72);
		for (let run = 0; run < 300; run++) {
			const a = random.string(random.int(0, 6), "abc");
			const b = random.string(random.int(0, 6), "abc");
			expect(editDistance(a, b)).toBe(byRecursion(a, b));
		}
	});
});
