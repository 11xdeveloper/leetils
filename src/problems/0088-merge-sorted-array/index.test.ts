import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mergeSortedArray } from ".";

const merge = (a: number[], b: number[]): number[] => {
	const nums1 = [...a, ...new Array<number>(b.length).fill(0)];
	mergeSortedArray(nums1, a.length, b, b.length);
	return nums1;
};

describe("88. Merge Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		const nums1 = [1, 2, 3, 0, 0, 0];
		expect(mergeSortedArray(nums1, 3, [2, 5, 6], 3)).toBeUndefined();
		expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
		expect(merge([1], [])).toEqual([1]);
		expect(merge([], [1])).toEqual([1]);
	});

	it("handles one array entirely before the other", () => {
		expect(merge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
		expect(merge([3, 4], [1, 2])).toEqual([1, 2, 3, 4]);
	});

	it("matches sorting on random inputs", () => {
		const random = createRandom(88);
		for (let run = 0; run < 500; run++) {
			const a = random
				.array(random.int(0, 10), -9, 9)
				.toSorted((x, y) => x - y);
			const b = random
				.array(random.int(0, 10), -9, 9)
				.toSorted((x, y) => x - y);
			expect(merge(a, b)).toEqual([...a, ...b].toSorted((x, y) => x - y));
		}
	});
});
