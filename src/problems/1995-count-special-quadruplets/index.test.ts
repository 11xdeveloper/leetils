import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSpecialQuadruplets as countQuadruplets } from ".";

describe("1995. Count Special Quadruplets", () => {
	it("solves the examples from the problem statement", () => {
		expect(countQuadruplets([1, 2, 3, 6])).toBe(1);
		expect(countQuadruplets([3, 3, 6, 4, 5])).toBe(0);
		expect(countQuadruplets([1, 1, 1, 3, 5])).toBe(4);
	});

	it("matches checking every quadruplet on random inputs", () => {
		const random = createRandom(1995);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(4, 10), 1, 10);
			let count = 0;
			for (let a = 0; a < nums.length; a++) {
				for (let b = a + 1; b < nums.length; b++) {
					for (let c = b + 1; c < nums.length; c++) {
						for (let d = c + 1; d < nums.length; d++)
							if ((nums[a] ?? 0) + (nums[b] ?? 0) + (nums[c] ?? 0) === nums[d])
								count++;
					}
				}
			}
			expect(countQuadruplets(nums)).toBe(count);
		}
	});
});
