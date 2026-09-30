import { describe, expect, it } from "bun:test";
import { primeArrangements as numPrimeArrangements } from ".";

/** Counts the permutations directly. */
const byBruteForce = (n: number): number => {
	const isPrime = (k: number) => {
		if (k < 2) return false;
		for (let d = 2; d * d <= k; d++) if (k % d === 0) return false;
		return true;
	};
	let count = 0;
	const used = new Array<boolean>(n + 1).fill(false);
	const place = (position: number): void => {
		if (position > n) {
			count++;
			return;
		}
		for (let value = 1; value <= n; value++) {
			if (used[value] || isPrime(value) !== isPrime(position)) continue;
			used[value] = true;
			place(position + 1);
			used[value] = false;
		}
	};
	place(1);
	return count;
};

describe("1175. Prime Arrangements", () => {
	it("solves the examples from the problem statement", () => {
		expect(numPrimeArrangements(5)).toBe(12);
		expect(numPrimeArrangements(100)).toBe(682289015);
	});

	it("matches counting the permutations for n up to 9", () => {
		for (let n = 1; n <= 9; n++)
			expect(numPrimeArrangements(n)).toBe(byBruteForce(n));
	});
});
