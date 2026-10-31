import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumKToReduceArrayWithinLimit as minimumK } from ".";

describe("3824. Minimum K to Reduce Array Within Limit", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumK([3, 7, 5])).toBe(3);
		expect(minimumK([1])).toBe(1);
	});

	it("matches trying every k", () => {
		const random = createRandom(3824);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 100);
			let k = 1;
			while (nums.reduce((ops, x) => ops + Math.ceil(x / k), 0) > k * k) k++;
			expect(minimumK(nums)).toBe(k);
		}
	});
});
