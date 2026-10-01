import { describe, expect, it } from "bun:test";
import { shortestPathToGetFood as getFood } from ".";

const parse = (rows: string[]) => rows.map((row) => [...row]);

describe("1730. Shortest Path to Get Food", () => {
	it("solves the examples from the problem statement", () => {
		expect(getFood(parse(["XXXXXX", "X*OOOX", "XOO#OX", "XXXXXX"]))).toBe(3);
		expect(getFood(parse(["XXXXX", "X*XOX", "XOX#X", "XXXXX"]))).toBe(-1);
		expect(
			getFood(
				parse(["XXXXXXXX", "X*OXO#OX", "XOOXOOXX", "XOOOO#OX", "XXXXXXXX"]),
			),
		).toBe(6);
	});

	it("handles food next to the start", () => {
		expect(getFood(parse(["*#"]))).toBe(1);
	});
});
