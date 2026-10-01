import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { addToArrayFormOfInteger as addToArrayForm } from ".";

describe("989. Add to Array-Form of Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(addToArrayForm([1, 2, 0, 0], 34)).toEqual([1, 2, 3, 4]);
		expect(addToArrayForm([2, 7, 4], 181)).toEqual([4, 5, 5]);
		expect(addToArrayForm([2, 1, 5], 806)).toEqual([1, 0, 2, 1]);
	});

	it("matches BigInt addition on random inputs", () => {
		const random = createRandom(989);
		for (let run = 0; run < 1000; run++) {
			const num = [random.int(1, 9), ...random.array(random.int(0, 30), 0, 9)];
			const k = random.int(1, 10_000);
			expect(addToArrayForm(num, k).join("")).toBe(
				String(BigInt(num.join("")) + BigInt(k)),
			);
		}
	});
});
