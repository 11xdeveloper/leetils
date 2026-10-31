import { describe, expect, it } from "bun:test";
import { lastRemainingIntegerAfterAlternatingDeletionOperations as lastInteger } from ".";

/** Performs the deletions. */
const byBruteForce = (n: number): number => {
	let list = Array.from({ length: n }, (_, i) => i + 1);
	for (let fromLeft = true; list.length > 1; fromLeft = !fromLeft) {
		const length = list.length;
		list = list.filter((_, i) =>
			fromLeft ? i % 2 === 0 : (length - 1 - i) % 2 === 0,
		);
	}
	return list[0] ?? 0;
};

describe("3782. Last Remaining Integer After Alternating Deletion Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastInteger(8)).toBe(3);
		expect(lastInteger(5)).toBe(1);
		expect(lastInteger(1)).toBe(1);
	});

	it("matches performing the deletions", () => {
		for (let n = 1; n <= 300; n++) expect(lastInteger(n)).toBe(byBruteForce(n));
	});
});
