import { describe, expect, it } from "bun:test";
import { buildingBoxes as minimumBoxes } from ".";

/** The capacity of each floor size, from the smallest floor up. */
const byCapacity = (n: number): number => {
	// With f = k(k+1)/2 + j floor boxes (0 ≤ j ≤ k), at most T(k) + j(j+1)/2 boxes fit.
	for (let floor = 1; ; floor++) {
		let k = 0;
		while (((k + 1) * (k + 2)) / 2 <= floor) k++;
		const j = floor - (k * (k + 1)) / 2;
		if ((k * (k + 1) * (k + 2)) / 6 + (j * (j + 1)) / 2 >= n) return floor;
	}
};

describe("1739. Building Boxes", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumBoxes(3)).toBe(3);
		expect(minimumBoxes(4)).toBe(3);
		expect(minimumBoxes(10)).toBe(6);
	});

	it("matches the capacity of each floor size for small n", () => {
		for (let n = 1; n <= 2000; n++) expect(minimumBoxes(n)).toBe(byCapacity(n));
	});

	it("handles 10^9", () => {
		expect(minimumBoxes(1_000_000_000)).toBe(1650467);
	});
});
