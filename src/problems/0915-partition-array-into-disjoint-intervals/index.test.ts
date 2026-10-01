import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionArrayIntoDisjointIntervals as partitionDisjoint } from ".";

describe("915. Partition Array into Disjoint Intervals", () => {
	it("solves the examples from the problem statement", () => {
		expect(partitionDisjoint([5, 0, 3, 8, 6])).toBe(3);
		expect(partitionDisjoint([1, 1, 1, 0, 6, 12])).toBe(4);
	});

	it("matches trying every split on random inputs with a valid split", () => {
		const random = createRandom(915);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(2, 12), 0, 6);
			const valid = (length: number) =>
				Math.max(...nums.slice(0, length)) <= Math.min(...nums.slice(length));
			const lengths = Array.from(
				{ length: nums.length - 1 },
				(_, i) => i + 1,
			).filter(valid);
			if (lengths.length === 0) continue;
			expect(partitionDisjoint(nums)).toBe(lengths[0] ?? 0);
		}
	});
});
