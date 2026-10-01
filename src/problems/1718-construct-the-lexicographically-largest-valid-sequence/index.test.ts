import { describe, expect, it } from "bun:test";
import { constructTheLexicographicallyLargestValidSequence as constructDistancedSequence } from ".";

/** Every valid sequence for n, by trying every placement of each number. */
const allValid = (n: number): number[][] => {
	const results: number[][] = [];
	const sequence = new Array<number>(2 * n - 1).fill(0);
	const place = (value: number) => {
		if (value === 0) {
			results.push([...sequence]);
			return;
		}
		for (let i = 0; i < sequence.length; i++) {
			const j = value === 1 ? i : i + value;
			if (j >= sequence.length || sequence[i] !== 0 || sequence[j] !== 0)
				continue;
			sequence[i] = value;
			sequence[j] = value;
			place(value - 1);
			sequence[i] = 0;
			sequence[j] = 0;
		}
	};
	place(n);
	return results;
};

const compare = (a: number[], b: number[]) => {
	for (let i = 0; i < a.length; i++)
		if (a[i] !== b[i]) return (a[i] ?? 0) - (b[i] ?? 0);
	return 0;
};

describe("1718. Construct the Lexicographically Largest Valid Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(constructDistancedSequence(3)).toEqual([3, 1, 2, 3, 2]);
		expect(constructDistancedSequence(5)).toEqual([5, 3, 1, 4, 3, 5, 2, 4, 2]);
	});

	it("matches the largest of every valid sequence for small n", () => {
		for (let n = 1; n <= 6; n++) {
			expect(constructDistancedSequence(n)).toEqual(
				allValid(n).sort(compare).at(-1) ?? [],
			);
		}
	});

	it("handles n = 20", () => {
		const sequence = constructDistancedSequence(20);
		for (let value = 2; value <= 20; value++) {
			const first = sequence.indexOf(value);
			expect(sequence[first + value]).toBe(value);
		}
	});
});
