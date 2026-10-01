import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheIndexOfTheLargeInteger as getIndex } from ".";

const reader = (arr: number[]) => {
	const sums = [0];
	for (const value of arr) sums.push((sums.at(-1) ?? 0) + value);
	const api = {
		calls: 0,
		compareSub: (l: number, r: number, x: number, y: number) => {
			api.calls++;
			const a = (sums[r + 1] ?? 0) - (sums[l] ?? 0);
			const b = (sums[y + 1] ?? 0) - (sums[x] ?? 0);
			return Math.sign(a - b);
		},
		length: () => arr.length,
	};
	return api;
};

describe("1533. Find the Index of the Large Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(getIndex(reader([7, 7, 7, 7, 10, 7, 7, 7]))).toBe(4);
		expect(getIndex(reader([6, 6, 12]))).toBe(2);
	});

	it("finds the large element anywhere within 20 calls", () => {
		const random = createRandom(1533);
		for (let run = 0; run < 300; run++) {
			const n = run < 250 ? random.int(2, 30) : random.int(2, 500000);
			const index = random.int(0, n - 1);
			const arr = new Array<number>(n).fill(5);
			arr[index] = random.int(6, 100);
			const api = reader(arr);
			expect(getIndex(api)).toBe(index);
			expect(api.calls).toBeLessThanOrEqual(20);
		}
	});
});
