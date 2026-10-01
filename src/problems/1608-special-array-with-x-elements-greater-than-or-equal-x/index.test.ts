import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { specialArrayWithXElementsGreaterThanOrEqualX as specialArray } from ".";

describe("1608. Special Array With X Elements Greater Than or Equal X", () => {
	it("solves the examples from the problem statement", () => {
		expect(specialArray([3, 5])).toBe(2);
		expect(specialArray([0, 0])).toBe(-1);
		expect(specialArray([0, 4, 3, 0, 4])).toBe(3);
	});

	it("matches trying every x on random inputs", () => {
		const random = createRandom(1608);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 12);
			let expected = -1;
			for (let x = 0; x <= nums.length; x++)
				if (nums.filter((v) => v >= x).length === x) expected = x;
			expect(specialArray(nums)).toBe(expected);
		}
	});
});
