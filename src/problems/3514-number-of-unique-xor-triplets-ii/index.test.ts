import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfUniqueXorTripletsII as uniqueXorTriplets } from ".";

describe("3514. Number of Unique XOR Triplets II", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueXorTriplets([1, 3])).toBe(2);
		expect(uniqueXorTriplets([6, 7, 8, 9])).toBe(4);
	});

	it("matches trying every triplet on random arrays", () => {
		const random = createRandom(3514);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 10), 1, 1500);
			const values = new Set<number>();
			for (let i = 0; i < nums.length; i++)
				for (let j = i; j < nums.length; j++)
					for (let k = j; k < nums.length; k++)
						values.add((nums[i] ?? 0) ^ (nums[j] ?? 0) ^ (nums[k] ?? 0));
			expect(uniqueXorTriplets(nums)).toBe(values.size);
		}
	});
});
