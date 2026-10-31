import { describe, expect, it } from "bun:test";
import { permutationsIII as permute } from ".";

describe("3437. Permutations III", () => {
	it("solves the examples from the problem statement", () => {
		expect(permute(4)).toEqual([
			[1, 2, 3, 4],
			[1, 4, 3, 2],
			[2, 1, 4, 3],
			[2, 3, 4, 1],
			[3, 2, 1, 4],
			[3, 4, 1, 2],
			[4, 1, 2, 3],
			[4, 3, 2, 1],
		]);
		expect(permute(2)).toEqual([
			[1, 2],
			[2, 1],
		]);
		expect(permute(3)).toEqual([
			[1, 2, 3],
			[3, 2, 1],
		]);
	});
});
