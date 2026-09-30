import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionArrayIntoThreePartsWithEqualSum as canThreePartsEqualSum } from ".";

describe("1013. Partition Array Into Three Parts With Equal Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canThreePartsEqualSum([0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]),
		).toBeTrue();
		expect(
			canThreePartsEqualSum([0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1]),
		).toBeFalse();
		expect(canThreePartsEqualSum([3, 3, 6, 5, -2, 2, 5, 1, -9, 4])).toBeTrue();
	});

	it("matches trying every pair of cuts on random inputs", () => {
		const random = createRandom(1013);
		const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(3, 10), -3, 3);
			let expected = false;
			for (let i = 1; i < arr.length; i++) {
				for (let j = i + 1; j < arr.length; j++) {
					const [a, b, c] = [
						sum(arr.slice(0, i)),
						sum(arr.slice(i, j)),
						sum(arr.slice(j)),
					];
					if (a === b && b === c) expected = true;
				}
			}
			expect(canThreePartsEqualSum(arr)).toBe(expected);
		}
	});
});
