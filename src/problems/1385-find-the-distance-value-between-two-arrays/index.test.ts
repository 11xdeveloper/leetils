import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheDistanceValueBetweenTwoArrays as findTheDistanceValue } from ".";

describe("1385. Find the Distance Value Between Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTheDistanceValue([4, 5, 8], [10, 9, 1, 8], 2)).toBe(2);
		expect(findTheDistanceValue([1, 4, 2, 3], [-4, -3, 6, 10, 20, 30], 3)).toBe(
			2,
		);
		expect(findTheDistanceValue([2, 1, 100, 3], [-5, -2, 10, -3, 7], 6)).toBe(
			1,
		);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1385);
		for (let run = 0; run < 300; run++) {
			const arr1 = random.array(random.int(1, 10), -20, 20);
			const arr2 = random.array(random.int(1, 10), -20, 20);
			const d = random.int(0, 10);
			expect(findTheDistanceValue(arr1, arr2, d)).toBe(
				arr1.filter((x) => arr2.every((y) => Math.abs(x - y) > d)).length,
			);
		}
	});
});
