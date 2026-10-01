import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrayTransformation as transformArray } from ".";

describe("1243. Array Transformation", () => {
	it("solves the examples from the problem statement", () => {
		expect(transformArray([6, 2, 3, 4])).toEqual([6, 3, 3, 4]);
		expect(transformArray([1, 6, 3, 4, 3, 5])).toEqual([1, 4, 4, 4, 4, 5]);
	});

	it("settles over several days", () => {
		// [3, 1, 2, 1, 3] becomes [3, 2, 1, 2, 3], then [3, 2, 2, 2, 3].
		expect(transformArray([3, 1, 2, 1, 3])).toEqual([3, 2, 2, 2, 3]);
	});

	it("ends with no peaks or valleys and the ends unchanged on random inputs", () => {
		const random = createRandom(1243);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(3, 15), 1, 100);
			const result = transformArray(arr);
			expect(result[0]).toBe(arr[0]);
			expect(result.at(-1)).toBe(arr.at(-1));
			for (let i = 1; i + 1 < result.length; i++) {
				const [left = 0, value = 0, right = 0] = result.slice(i - 1, i + 2);
				expect(value < left && value < right).toBeFalse();
				expect(value > left && value > right).toBeFalse();
			}
		}
	});
});
