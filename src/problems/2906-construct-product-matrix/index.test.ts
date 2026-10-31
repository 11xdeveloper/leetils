import { describe, expect, it } from "bun:test";
import { constructProductMatrix } from ".";

describe("2906. Construct Product Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			constructProductMatrix([
				[1, 2],
				[3, 4],
			]),
		).toEqual([
			[24, 12],
			[8, 6],
		]);
		expect(constructProductMatrix([[12345], [2], [1]])).toEqual([
			[2],
			[0],
			[0],
		]);
	});
});
