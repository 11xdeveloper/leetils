import { describe, expect, it } from "bun:test";
import { findTheNumberOfKEvenArrays as countOfArrays } from ".";

/** Tries every array. */
const byBruteForce = (n: number, m: number, k: number): number => {
	let count = 0;
	for (let code = 0; code < m ** n; code++) {
		const arr: number[] = [];
		for (let rest = code, i = 0; i < n; i++, rest = Math.floor(rest / m))
			arr.push((rest % m) + 1);
		let pairs = 0;
		for (let i = 1; i < n; i++)
			if (
				(((arr[i - 1] ?? 0) * (arr[i] ?? 0) -
					(arr[i - 1] ?? 0) -
					(arr[i] ?? 0)) &
					1) ===
				0
			)
				pairs++;
		if (pairs === k) count++;
	}
	return count;
};

describe("3339. Find the Number of K-Even Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOfArrays(3, 4, 2)).toBe(8);
		expect(countOfArrays(5, 1, 0)).toBe(1);
		expect(countOfArrays(7, 7, 5)).toBe(5832);
	});

	it("matches trying every array for small inputs", () => {
		for (let n = 1; n <= 5; n++)
			for (let m = 1; m <= 4; m++)
				for (let k = 0; k < n; k++)
					expect(countOfArrays(n, m, k)).toBe(byBruteForce(n, m, k));
	});
});
