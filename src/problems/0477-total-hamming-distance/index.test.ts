import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { hammingDistance } from "../0461-hamming-distance";
import { totalHammingDistance } from ".";

describe("477. Total Hamming Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalHammingDistance([4, 14, 2])).toBe(6);
		expect(totalHammingDistance([4, 14, 4])).toBe(4);
	});

	it("matches summing every pair on random inputs", () => {
		const random = createRandom(477);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 0, 10 ** 9);
			let expected = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i + 1; j < nums.length; j++)
					expected += hammingDistance(nums[i] ?? 0, nums[j] ?? 0);
			}
			expect(totalHammingDistance(nums)).toBe(expected);
		}
	});
});
