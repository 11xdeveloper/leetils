import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAllNumbersDisappearedInAnArray as findDisappeared } from ".";

describe("448. Find All Numbers Disappeared in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findDisappeared([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([5, 6]);
		expect(findDisappeared([1, 1])).toEqual([2]);
	});

	it("leaves the array as it started", () => {
		const nums = [4, 3, 2, 7, 8, 2, 3, 1];
		findDisappeared(nums);
		expect(nums).toEqual([4, 3, 2, 7, 8, 2, 3, 1]);
	});

	it("matches checking a Set on random inputs", () => {
		const random = createRandom(448);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 15);
			const nums = random.array(n, 1, n);
			const present = new Set(nums);
			const expected = Array.from({ length: n }, (_, i) => i + 1).filter(
				(x) => !present.has(x),
			);
			expect(findDisappeared([...nums])).toEqual(expected);
		}
	});
});
