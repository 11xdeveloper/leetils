import { describe, expect, it } from "bun:test";
import { substringXorQueries } from ".";

describe("2564. Substring XOR Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			substringXorQueries("101101", [
				[0, 5],
				[1, 2],
			]),
		).toEqual([
			[0, 2],
			[2, 3],
		]);
		expect(substringXorQueries("0101", [[12, 8]])).toEqual([[-1, -1]]);
		expect(substringXorQueries("1", [[4, 5]])).toEqual([[0, 0]]);
	});
});
