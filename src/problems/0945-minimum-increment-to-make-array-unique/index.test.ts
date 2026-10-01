import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumIncrementToMakeArrayUnique as minIncrementForUnique } from ".";

describe("945. Minimum Increment to Make Array Unique", () => {
	it("solves the examples from the problem statement", () => {
		expect(minIncrementForUnique([1, 2, 2])).toBe(1);
		expect(minIncrementForUnique([3, 2, 1, 2, 1, 7])).toBe(6);
	});

	it("matches repeatedly bumping the smallest duplicate on random inputs", () => {
		const random = createRandom(945);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 0, 6);
			const values = [...nums];
			let moves = 0;
			for (;;) {
				const duplicate = values
					.toSorted((a, b) => a - b)
					.find((v, i, all) => all[i + 1] === v);
				if (duplicate === undefined) break;
				values[values.indexOf(duplicate)] = duplicate + 1;
				moves++;
			}
			expect(minIncrementForUnique(nums)).toBe(moves);
		}
	});
});
