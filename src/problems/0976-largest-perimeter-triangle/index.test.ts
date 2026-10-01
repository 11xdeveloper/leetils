import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestPerimeterTriangle as largestPerimeter } from ".";

describe("976. Largest Perimeter Triangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPerimeter([2, 1, 2])).toBe(5);
		expect(largestPerimeter([1, 2, 1, 10])).toBe(0);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(976);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(3, 10), 1, 20);
			let expected = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i + 1; j < nums.length; j++) {
					for (let k = j + 1; k < nums.length; k++) {
						const [a = 0, b = 0, c = 0] = [nums[i], nums[j], nums[k]].sort(
							(x = 0, y = 0) => x - y,
						);
						if (a + b > c) expected = Math.max(expected, a + b + c);
					}
				}
			}
			expect(largestPerimeter(nums)).toBe(expected);
		}
	});
});
