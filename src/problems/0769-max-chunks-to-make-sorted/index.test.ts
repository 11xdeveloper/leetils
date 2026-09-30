import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxChunksToMakeSortedII } from "../0768-max-chunks-to-make-sorted-ii";
import { maxChunksToMakeSorted as maxChunksToSorted } from ".";

describe("769. Max Chunks To Make Sorted", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxChunksToSorted([4, 3, 2, 1, 0])).toBe(1);
		expect(maxChunksToSorted([1, 0, 2, 3, 4])).toBe(4);
	});

	it("agrees with the general version on random permutations", () => {
		const random = createRandom(769);
		for (let run = 0; run < 1000; run++) {
			const arr = Array.from({ length: random.int(1, 10) }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			expect(maxChunksToSorted(arr)).toBe(maxChunksToMakeSortedII(arr));
		}
	});
});
