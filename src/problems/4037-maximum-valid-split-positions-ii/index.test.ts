import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumValidSplitPositionsI } from "../4035-maximum-valid-split-positions-i";
import { maximumValidSplitPositionsII as maxValidSplits } from ".";

describe("4037. Maximum Valid Split Positions II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValidSplits([10, 30, 15, 10])).toBe(2);
		expect(maxValidSplits([2, 10, 14])).toBe(1);
		expect(maxValidSplits([2, 4])).toBe(0);
	});

	it("matches part I on random arrays", () => {
		const random = createRandom(4037);
		for (let run = 0; run < 300; run++) {
			const nums = random
				.array(random.int(2, 10), 1, 4)
				.map((x) => x * random.int(1, 3));
			expect(maxValidSplits(nums)).toBe(maximumValidSplitPositionsI(nums));
		}
	});
});
