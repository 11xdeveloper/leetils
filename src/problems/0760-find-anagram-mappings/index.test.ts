import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAnagramMappings as anagramMappings } from ".";

describe("760. Find Anagram Mappings", () => {
	it("solves the examples from the problem statement", () => {
		expect(anagramMappings([12, 28, 46, 32, 50], [50, 12, 32, 46, 28])).toEqual(
			[1, 4, 3, 2, 0],
		);
		expect(anagramMappings([84, 46], [84, 46])).toEqual([0, 1]);
	});

	it("gives a valid one-to-one mapping on random inputs with duplicates", () => {
		const random = createRandom(760);
		for (let run = 0; run < 1000; run++) {
			const nums1 = random.array(random.int(1, 12), 0, 4);
			const nums2 = nums1.toSorted(() => random.next() - 0.5);
			const mapping = anagramMappings(nums1, nums2);
			expect(new Set(mapping).size).toBe(nums1.length);
			expect(mapping.map((index) => nums2[index])).toEqual(nums1);
		}
	});
});
