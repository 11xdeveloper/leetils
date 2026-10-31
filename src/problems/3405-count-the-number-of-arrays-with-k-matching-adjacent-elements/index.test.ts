import { describe, expect, it } from "bun:test";
import { countTheNumberOfArraysWithKMatchingAdjacentElements as countGoodArrays } from ".";

describe("3405. Count the Number of Arrays with K Matching Adjacent Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodArrays(3, 2, 1)).toBe(4);
		expect(countGoodArrays(4, 2, 2)).toBe(6);
		expect(countGoodArrays(5, 2, 0)).toBe(2);
	});

	it("matches trying every array for small inputs", () => {
		for (let n = 1; n <= 5; n++)
			for (let m = 1; m <= 4; m++)
				for (let k = 0; k < n; k++) {
					let count = 0;
					for (let code = 0; code < m ** n; code++) {
						const arr: number[] = [];
						for (
							let rest = code, i = 0;
							i < n;
							i++, rest = Math.floor(rest / m)
						)
							arr.push(rest % m);
						if (arr.slice(1).filter((v, i) => v === arr[i]).length === k)
							count++;
					}
					expect(countGoodArrays(n, m, k)).toBe(count);
				}
	});
});
