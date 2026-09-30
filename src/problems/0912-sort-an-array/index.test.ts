import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortAnArray as sortArray } from ".";

describe("912. Sort an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortArray([5, 2, 3, 1])).toEqual([1, 2, 3, 5]);
		expect(sortArray([5, 1, 1, 2, 0, 0])).toEqual([0, 0, 1, 1, 2, 5]);
	});

	it("matches the built-in sort on random arrays", () => {
		const random = createRandom(912);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(0, 40), -50, 50);
			expect(sortArray(nums)).toEqual(nums.toSorted((a, b) => a - b));
		}
	});

	it("sorts 50,000 numbers", () => {
		const random = createRandom(9120);
		const nums = random.array(50_000, -50_000, 50_000);
		expect(sortArray(nums)).toEqual(nums.toSorted((a, b) => a - b));
	});
});
