import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeArrayStrictlyIncreasing as makeArrayIncreasing } from ".";

/** Tries keeping or replacing each element with every value of arr2. */
const byBruteForce = (arr1: number[], arr2: number[]): number => {
	let best = Infinity;
	const choose = (i: number, previous: number, operations: number): void => {
		if (i === arr1.length) {
			best = Math.min(best, operations);
			return;
		}
		const value = arr1[i] ?? 0;
		if (value > previous) choose(i + 1, value, operations);
		for (const replacement of arr2) {
			if (replacement > previous) choose(i + 1, replacement, operations + 1);
		}
	};
	choose(0, -Infinity, 0);
	return best === Infinity ? -1 : best;
};

describe("1187. Make Array Strictly Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeArrayIncreasing([1, 5, 3, 6, 7], [1, 3, 2, 4])).toBe(1);
		expect(makeArrayIncreasing([1, 5, 3, 6, 7], [4, 3, 1])).toBe(2);
		expect(makeArrayIncreasing([1, 5, 3, 6, 7], [1, 6, 3, 3])).toBe(-1);
	});

	it("handles the largest inputs", () => {
		const arr1 = Array.from({ length: 2000 }, (_, i) => 2000 - i);
		const arr2 = Array.from({ length: 2000 }, (_, i) => i);
		expect(makeArrayIncreasing(arr1, arr2)).toBe(1999);
	});

	it("matches trying every replacement on random inputs", () => {
		const random = createRandom(1187);
		for (let run = 0; run < 300; run++) {
			const arr1 = random.array(random.int(1, 6), 0, 8);
			const arr2 = random.array(random.int(1, 4), 0, 8);
			expect(makeArrayIncreasing(arr1, arr2)).toBe(byBruteForce(arr1, arr2));
		}
	});
});
