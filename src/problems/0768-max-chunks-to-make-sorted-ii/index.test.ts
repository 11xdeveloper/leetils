import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxChunksToMakeSortedII as maxChunksToSorted } from ".";

/** A cut after position i works when the prefix, sorted, matches the sorted array's prefix. */
const byBruteForce = (arr: number[]): number => {
	const sorted = arr.toSorted((a, b) => a - b);
	let chunks = 0;
	for (let i = 1; i <= arr.length; i++) {
		if (
			arr
				.slice(0, i)
				.sort((a, b) => a - b)
				.join() === sorted.slice(0, i).join()
		)
			chunks++;
	}
	return chunks;
};

describe("768. Max Chunks To Make Sorted II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxChunksToSorted([5, 4, 3, 2, 1])).toBe(1);
		expect(maxChunksToSorted([2, 1, 3, 4, 4])).toBe(4);
	});

	it("matches checking every cut on random arrays", () => {
		const random = createRandom(768);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 0, 5);
			expect(maxChunksToSorted(arr)).toBe(byBruteForce(arr));
		}
	});
});
