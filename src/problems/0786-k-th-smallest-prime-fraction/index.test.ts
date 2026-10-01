import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kThSmallestPrimeFraction } from ".";

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

describe("786. K-th Smallest Prime Fraction", () => {
	it("solves the examples from the problem statement", () => {
		expect(kThSmallestPrimeFraction([1, 2, 3, 5], 3)).toEqual([2, 5]);
		expect(kThSmallestPrimeFraction([1, 7], 1)).toEqual([1, 7]);
	});

	it("matches sorting every fraction on random inputs", () => {
		const random = createRandom(786);
		for (let run = 0; run < 500; run++) {
			const arr = [1, ...primes.filter(() => random.int(0, 1) === 1)];
			if (arr.length < 2) arr.push(2);
			const fractions: number[][] = [];
			for (let i = 0; i < arr.length; i++)
				for (let j = i + 1; j < arr.length; j++)
					fractions.push([arr[i] ?? 0, arr[j] ?? 1]);
			fractions.sort(
				(a, b) => (a[0] ?? 0) * (b[1] ?? 1) - (b[0] ?? 0) * (a[1] ?? 1),
			);
			const k = random.int(1, fractions.length);
			expect(kThSmallestPrimeFraction(arr, k)).toEqual(fractions[k - 1] ?? []);
		}
	});
});
