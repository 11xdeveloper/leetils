import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayElementsZero as minOperations } from ".";

/** Greedily divides the two largest numbers each time. */
const byGreedy = (l: number, r: number): number => {
	const values = Array.from({ length: r - l + 1 }, (_, i) => l + i);
	let operations = 0;
	for (;;) {
		values.sort((a, b) => b - a);
		if ((values[0] ?? 0) === 0) return operations;
		values[0] = Math.floor((values[0] ?? 0) / 4);
		values[1] = Math.floor((values[1] ?? 0) / 4);
		operations++;
	}
};

describe("3495. Minimum Operations to Make Array Elements Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minOperations([
				[1, 2],
				[2, 4],
			]),
		).toBe(3);
		expect(minOperations([[2, 6]])).toBe(4);
	});

	it("matches dividing greedily on small ranges", () => {
		for (let l = 1; l <= 20; l++)
			for (let r = l + 1; r <= 40; r++)
				expect(minOperations([[l, r]])).toBe(byGreedy(l, r));
	});
});
