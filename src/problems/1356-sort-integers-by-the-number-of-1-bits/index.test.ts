import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortIntegersByTheNumberOf1Bits as sortByBits } from ".";

describe("1356. Sort Integers by The Number of 1 Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])).toEqual([
			0, 1, 2, 4, 8, 3, 5, 6, 7,
		]);
		expect(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1])).toEqual([
			1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024,
		]);
	});

	it("matches sorting by binary strings on random inputs", () => {
		const random = createRandom(1356);
		const ones = (x: number) => x.toString(2).replaceAll("0", "").length;
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(1, 15), 0, 10 ** 4);
			expect(sortByBits(arr)).toEqual(
				arr.toSorted((a, b) => ones(a) - ones(b) || a - b),
			);
		}
	});
});
