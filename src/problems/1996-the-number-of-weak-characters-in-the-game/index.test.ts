import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theNumberOfWeakCharactersInTheGame as numberOfWeakCharacters } from ".";

describe("1996. The Number of Weak Characters in the Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfWeakCharacters([
				[5, 5],
				[6, 3],
				[3, 6],
			]),
		).toBe(0);
		expect(
			numberOfWeakCharacters([
				[2, 2],
				[3, 3],
			]),
		).toBe(1);
		expect(
			numberOfWeakCharacters([
				[1, 5],
				[10, 4],
				[4, 3],
			]),
		).toBe(1);
	});

	it("matches comparing every pair on random inputs", () => {
		const random = createRandom(1996);
		for (let run = 0; run < 300; run++) {
			const properties = Array.from({ length: random.int(2, 10) }, () => [
				random.int(1, 5),
				random.int(1, 5),
			]);
			const expected = properties.filter(([a = 0, d = 0]) =>
				properties.some(([a2 = 0, d2 = 0]) => a2 > a && d2 > d),
			).length;
			expect(numberOfWeakCharacters(properties)).toBe(expected);
		}
	});
});
