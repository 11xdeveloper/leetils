import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfOperationsToMoveAllBallsToEachBox as minOperations } from ".";

describe("1769. Minimum Number of Operations to Move All Balls to Each Box", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("110")).toEqual([1, 1, 3]);
		expect(minOperations("001011")).toEqual([11, 8, 5, 4, 3, 4]);
	});

	it("matches summing distances on random inputs", () => {
		const random = createRandom(1769);
		for (let run = 0; run < 200; run++) {
			const boxes = random.string(random.int(1, 12), "01");
			const expected = [...boxes].map((_, i) =>
				[...boxes].reduce(
					(sum, c, j) => (c === "1" ? sum + Math.abs(i - j) : sum),
					0,
				),
			);
			expect(minOperations(boxes)).toEqual(expected);
		}
	});
});
