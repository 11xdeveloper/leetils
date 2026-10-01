import { describe, expect, it } from "bun:test";
import { numberOfOperationsToMakeNetworkConnected as makeConnected } from ".";

describe("1319. Number of Operations to Make Network Connected", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			makeConnected(4, [
				[0, 1],
				[0, 2],
				[1, 2],
			]),
		).toBe(1);
		expect(
			makeConnected(6, [
				[0, 1],
				[0, 2],
				[0, 3],
				[1, 2],
				[1, 3],
			]),
		).toBe(2);
		expect(
			makeConnected(6, [
				[0, 1],
				[0, 2],
				[0, 3],
				[1, 2],
			]),
		).toBe(-1);
	});

	it("needs no moves for a connected network", () => {
		const chain = Array.from({ length: 99999 }, (_, i) => [i, i + 1]);
		expect(makeConnected(100000, chain)).toBe(0);
	});
});
