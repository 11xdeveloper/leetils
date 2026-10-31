import { describe, expect, it } from "bun:test";
import { findNthSmallestIntegerWithKOneBits as nthSmallest } from ".";

describe("3821. Find Nth Smallest Integer With K One Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(nthSmallest(4, 2)).toBe(9);
		expect(nthSmallest(3, 1)).toBe(4);
	});

	it("matches listing numbers in order", () => {
		for (let k = 1; k <= 4; k++) {
			const list: number[] = [];
			for (let x = 1; x < 5000; x++)
				if (x.toString(2).split("1").length - 1 === k) list.push(x);
			list.forEach((x, i) => {
				expect(nthSmallest(i + 1, k)).toBe(x);
			});
		}
	});
});
