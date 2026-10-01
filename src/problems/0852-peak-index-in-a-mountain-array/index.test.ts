import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { peakIndexInAMountainArray as peakIndexInMountainArray } from ".";

describe("852. Peak Index in a Mountain Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(peakIndexInMountainArray([0, 1, 0])).toBe(1);
		expect(peakIndexInMountainArray([0, 2, 1, 0])).toBe(1);
		expect(peakIndexInMountainArray([0, 10, 5, 2])).toBe(1);
	});

	it("finds the peak of random mountains", () => {
		const random = createRandom(852);
		for (let run = 0; run < 1000; run++) {
			const peak = random.int(1, 10);
			const arr = [
				...Array.from({ length: peak }, (_, i) => i * 2),
				100,
				...Array.from({ length: random.int(1, 10) }, (_, i) => 50 - i),
			];
			expect(peakIndexInMountainArray(arr)).toBe(peak);
		}
	});
});
