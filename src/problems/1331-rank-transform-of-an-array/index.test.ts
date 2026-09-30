import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rankTransformOfAnArray as arrayRankTransform } from ".";

describe("1331. Rank Transform of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayRankTransform([40, 10, 20, 30])).toEqual([4, 1, 2, 3]);
		expect(arrayRankTransform([100, 100, 100])).toEqual([1, 1, 1]);
		expect(arrayRankTransform([37, 12, 28, 9, 100, 56, 80, 5, 12])).toEqual([
			5, 3, 4, 2, 8, 6, 7, 1, 3,
		]);
	});

	it("handles an empty array", () => {
		expect(arrayRankTransform([])).toEqual([]);
	});

	it("matches counting smaller distinct values on random inputs", () => {
		const random = createRandom(1331);
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(0, 12), -10, 10);
			expect(arrayRankTransform(arr)).toEqual(
				arr.map(
					(value) => new Set(arr.filter((other) => other < value)).size + 1,
				),
			);
		}
	});
});
