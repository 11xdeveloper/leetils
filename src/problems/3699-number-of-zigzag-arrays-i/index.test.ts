import { describe, expect, it } from "bun:test";
import { numberOfZigzagArraysI as zigZagArrays } from ".";

/** Builds every array. */
const byBruteForce = (n: number, l: number, r: number): number => {
	let count = 0;
	const go = (arr: number[]): void => {
		if (arr.length === n) {
			count++;
			return;
		}
		for (let v = l; v <= r; v++) {
			const k = arr.length;
			if (k >= 1 && v === arr[k - 1]) continue;
			if (
				k >= 2 &&
				(v - (arr[k - 1] ?? 0)) * ((arr[k - 1] ?? 0) - (arr[k - 2] ?? 0)) > 0
			)
				continue;
			go([...arr, v]);
		}
	};
	go([]);
	return count;
};

describe("3699. Number of ZigZag Arrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(zigZagArrays(3, 4, 5)).toBe(2);
		expect(zigZagArrays(3, 1, 3)).toBe(10);
	});

	it("matches building every array for small sizes", () => {
		for (let n = 1; n <= 6; n++)
			for (let r = 1; r <= 5; r++)
				expect(zigZagArrays(n, 1, r)).toBe(byBruteForce(n, 1, r));
	});
});
