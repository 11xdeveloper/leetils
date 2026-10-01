import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findLuckyIntegerInAnArray as findLucky } from ".";

describe("1394. Find Lucky Integer in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLucky([2, 2, 3, 4])).toBe(2);
		expect(findLucky([1, 2, 2, 3, 3, 3])).toBe(3);
		expect(findLucky([2, 2, 2, 3, 3])).toBe(-1);
	});

	it("matches counting with filter on random inputs", () => {
		const random = createRandom(1394);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 4);
			const lucky = arr.filter(
				(value) => arr.filter((x) => x === value).length === value,
			);
			expect(findLucky(arr)).toBe(Math.max(-1, ...lucky));
		}
	});
});
