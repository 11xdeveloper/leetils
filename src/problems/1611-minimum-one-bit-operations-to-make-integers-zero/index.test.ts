import { describe, expect, it } from "bun:test";
import { minimumOneBitOperationsToMakeIntegersZero as minimumOneBitOperations } from ".";

/** Breadth-first search from 0 over the two operations, for values below 2^bits. */
const fewest = (bits: number): number[] => {
	const distance = new Array<number>(2 ** bits).fill(-1);
	distance[0] = 0;
	const queue = [0];
	for (let i = 0; i < queue.length; i++) {
		const n = queue[i] ?? 0;
		const moves = [n ^ 1];
		for (let bit = 1; bit < bits; bit++) {
			if (((n >> (bit - 1)) & 1) === 1 && (n & ((1 << (bit - 1)) - 1)) === 0)
				moves.push(n ^ (1 << bit));
		}
		for (const next of moves) {
			if (distance[next] !== -1) continue;
			distance[next] = (distance[n] ?? 0) + 1;
			queue.push(next);
		}
	}
	return distance;
};

describe("1611. Minimum One Bit Operations to Make Integers Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOneBitOperations(3)).toBe(2);
		expect(minimumOneBitOperations(6)).toBe(4);
	});

	it("matches a breadth-first search for every value below 2^12", () => {
		const distance = fewest(12);
		for (let n = 0; n < 2 ** 12; n++)
			expect(minimumOneBitOperations(n)).toBe(distance[n] ?? -1);
	});

	it("handles 10^9", () => {
		expect(minimumOneBitOperations(2 ** 29)).toBe(2 ** 30 - 1);
	});
});
