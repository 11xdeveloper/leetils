import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { howManyNumbersAreSmallerThanTheCurrentNumber as smallerNumbersThanCurrent } from ".";

describe("1365. How Many Numbers Are Smaller Than the Current Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallerNumbersThanCurrent([8, 1, 2, 2, 3])).toEqual([4, 0, 1, 1, 3]);
		expect(smallerNumbersThanCurrent([6, 5, 4, 8])).toEqual([2, 1, 0, 3]);
		expect(smallerNumbersThanCurrent([7, 7, 7, 7])).toEqual([0, 0, 0, 0]);
	});

	it("matches counting on random inputs", () => {
		const random = createRandom(1365);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 12), 0, 100);
			expect(smallerNumbersThanCurrent(nums)).toEqual(
				nums.map((num) => nums.filter((other) => other < num).length),
			);
		}
	});
});
