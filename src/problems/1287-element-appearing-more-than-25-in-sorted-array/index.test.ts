import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { elementAppearingMoreThan25InSortedArray as findSpecialInteger } from ".";

describe("1287. Element Appearing More Than 25% In Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSpecialInteger([1, 2, 2, 6, 6, 6, 6, 7, 10])).toBe(6);
		expect(findSpecialInteger([1, 1])).toBe(1);
	});

	it("finds the frequent value in random arrays", () => {
		const random = createRandom(1287);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 30);
			const special = random.int(0, 100);
			const count = random.int(Math.floor(n / 4) + 1, n);
			const others = random
				.array(n - count, 0, 100)
				.map((value) => (value === special ? special + 1 : value));
			// Skip the rare inputs where another value also passes a quarter.
			const arr = [...others, ...new Array<number>(count).fill(special)].sort(
				(a, b) => a - b,
			);
			const frequent = [...new Set(arr)].filter(
				(value) => arr.filter((x) => x === value).length > n / 4,
			);
			if (frequent.length !== 1) continue;
			expect(findSpecialInteger(arr)).toBe(special);
		}
	});
});
