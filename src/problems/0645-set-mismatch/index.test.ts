import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { setMismatch as findErrorNums } from ".";

describe("645. Set Mismatch", () => {
	it("solves the examples from the problem statement", () => {
		expect(findErrorNums([1, 2, 2, 4])).toEqual([2, 3]);
		expect(findErrorNums([1, 1])).toEqual([1, 2]);
	});

	it("finds the duplicate and the missing number on random inputs", () => {
		const random = createRandom(645);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(2, 20);
			const missing = random.int(1, n);
			let duplicated = random.int(1, n - 1);
			if (duplicated >= missing) duplicated++;
			const nums = Array.from({ length: n }, (_, i) =>
				i + 1 === missing ? duplicated : i + 1,
			).sort(() => random.next() - 0.5);
			expect(findErrorNums(nums)).toEqual([duplicated, missing]);
		}
	});
});
