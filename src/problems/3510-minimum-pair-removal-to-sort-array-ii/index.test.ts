import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumPairRemovalToSortArrayI } from "../3507-minimum-pair-removal-to-sort-array-i";
import { minimumPairRemovalToSortArrayII as minimumPairRemoval } from ".";

describe("3510. Minimum Pair Removal to Sort Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPairRemoval([5, 2, 3, 1])).toBe(2);
		expect(minimumPairRemoval([1, 2, 2])).toBe(0);
	});

	it("matches the direct simulation on random arrays", () => {
		const random = createRandom(3510);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -5, 5);
			expect(minimumPairRemoval(nums)).toBe(
				minimumPairRemovalToSortArrayI(nums),
			);
		}
	});
});
