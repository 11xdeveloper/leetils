import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validTriangleNumber as triangleNumber } from ".";

const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				const [a = 0, b = 0, c = 0] = [nums[i], nums[j], nums[k]];
				if (a + b > c && a + c > b && b + c > a) count++;
			}
		}
	}
	return count;
};

describe("611. Valid Triangle Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(triangleNumber([2, 2, 3, 4])).toBe(3);
		expect(triangleNumber([4, 2, 3, 4])).toBe(4);
	});

	it("rejects sides of length 0", () => {
		expect(triangleNumber([0, 0, 0])).toBe(0);
		expect(triangleNumber([0, 1, 1])).toBe(0);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(611);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 10);
			expect(triangleNumber(nums)).toBe(byBruteForce(nums));
		}
	});
});
