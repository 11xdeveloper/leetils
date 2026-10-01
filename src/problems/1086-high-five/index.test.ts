import { describe, expect, it } from "bun:test";
import { highFive } from ".";

describe("1086. High Five", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			highFive([
				[1, 91],
				[1, 92],
				[2, 93],
				[2, 97],
				[1, 60],
				[2, 77],
				[1, 65],
				[1, 87],
				[1, 100],
				[2, 100],
				[2, 76],
			]),
		).toEqual([
			[1, 87],
			[2, 88],
		]);
		expect(
			highFive([
				[1, 100],
				[7, 100],
				[1, 100],
				[7, 100],
				[1, 100],
				[7, 100],
				[1, 100],
				[7, 100],
				[1, 100],
				[7, 100],
			]),
		).toEqual([
			[1, 100],
			[7, 100],
		]);
	});
});
