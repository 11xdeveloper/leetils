import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfEqualNumbersBlocks as countBlocks } from ".";

const bigArray = (values: number[]) => ({
	at: (i: number) => values[i] ?? 0,
	size: () => values.length,
});

describe("2936. Number of Equal Numbers Blocks", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBlocks(bigArray([3, 3, 3, 3, 3]))).toBe(1);
		expect(countBlocks(bigArray([1, 1, 1, 3, 9, 9, 9, 2, 10, 10]))).toBe(5);
		expect(countBlocks(bigArray([1, 2, 5, 7]))).toBe(4);
	});

	it("counts random runs of blocks", () => {
		const random = createRandom(2936);
		for (let run = 0; run < 300; run++) {
			const blocks = random.int(1, 8);
			const values = Array.from({ length: blocks }, (_, b) =>
				Array<number>(random.int(1, 20)).fill(b),
			).flat();
			expect(countBlocks(bigArray(values))).toBe(blocks);
		}
	});
});
