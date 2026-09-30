import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestMountainInArray as longestMountain } from ".";

const isMountain = (values: number[]): boolean => {
	let i = 0;
	while (i + 1 < values.length && (values[i] ?? 0) < (values[i + 1] ?? 0)) i++;
	if (i === 0 || i === values.length - 1) return false;
	while (i + 1 < values.length && (values[i] ?? 0) > (values[i + 1] ?? 0)) i++;
	return i === values.length - 1;
};

describe("845. Longest Mountain in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestMountain([2, 1, 4, 7, 3, 2, 5])).toBe(5);
		expect(longestMountain([2, 2, 2])).toBe(0);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(845);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 0, 4);
			let expected = 0;
			for (let i = 0; i < arr.length; i++)
				for (let j = i + 3; j <= arr.length; j++)
					if (isMountain(arr.slice(i, j))) expected = Math.max(expected, j - i);
			expect(longestMountain(arr)).toBe(expected);
		}
	});
});
