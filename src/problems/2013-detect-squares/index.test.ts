import { describe, expect, it } from "bun:test";
import { DetectSquares } from ".";

describe("2013. Detect Squares", () => {
	it("solves the example from the problem statement", () => {
		const squares = new DetectSquares();
		squares.add([3, 10]);
		squares.add([11, 2]);
		squares.add([3, 2]);
		expect(squares.count([11, 10])).toBe(1);
		expect(squares.count([14, 8])).toBe(0);
		squares.add([11, 2]);
		expect(squares.count([11, 10])).toBe(2);
	});

	it("counts each copy of a corner", () => {
		const squares = new DetectSquares();
		for (const point of [
			[0, 0],
			[0, 1],
			[1, 0],
			[0, 2],
			[2, 0],
			[2, 2],
		])
			squares.add(point);
		expect(squares.count([1, 1])).toBe(1);
		expect(squares.count([0, 0])).toBe(1);
		squares.add([0, 0]);
		expect(squares.count([2, 2])).toBe(2);
		squares.add([1, 1]);
		expect(squares.count([0, 0])).toBe(2);
		expect(squares.count([1000, 1000])).toBe(0);
	});
});
