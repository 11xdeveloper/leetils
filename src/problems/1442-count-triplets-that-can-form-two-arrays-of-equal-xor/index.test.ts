import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTripletsThatCanFormTwoArraysOfEqualXor as countTriplets } from ".";

/** Checks every triple. */
const byBruteForce = (arr: number[]): number => {
	const xor = (from: number, to: number) =>
		arr.slice(from, to).reduce((x, v) => x ^ v, 0);
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			for (let k = j; k < arr.length; k++)
				if (xor(i, j) === xor(j, k + 1)) count++;
		}
	}
	return count;
};

describe("1442. Count Triplets That Can Form Two Arrays of Equal XOR", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTriplets([2, 3, 1, 6, 7])).toBe(4);
		expect(countTriplets([1, 1, 1, 1, 1])).toBe(10);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(1442);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 4);
			expect(countTriplets(arr)).toBe(byBruteForce(arr));
		}
	});
});
