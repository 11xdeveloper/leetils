import { describe, expect, it } from "bun:test";
import { DesignNeighborSumService as NeighborSum } from ".";

describe("3242. Design Neighbor Sum Service", () => {
	it("solves the examples from the problem statement", () => {
		const a = new NeighborSum([
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
		]);
		expect([
			a.adjacentSum(1),
			a.adjacentSum(4),
			a.diagonalSum(4),
			a.diagonalSum(8),
		]).toEqual([6, 16, 16, 4]);
		const b = new NeighborSum([
			[1, 2, 0, 3],
			[4, 7, 15, 6],
			[8, 9, 10, 11],
			[12, 13, 14, 5],
		]);
		expect([b.adjacentSum(15), b.diagonalSum(9)]).toEqual([23, 45]);
	});
});
