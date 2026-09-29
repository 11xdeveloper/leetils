import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { singleNumberII } from ".";

describe("137. Single Number II", () => {
	it("solves the examples from the problem statement", () => {
		expect(singleNumberII([2, 2, 3, 2])).toBe(3);
		expect(singleNumberII([0, 1, 0, 1, 0, 1, 99])).toBe(99);
	});

	it("handles negative numbers and the 32-bit limits", () => {
		expect(singleNumberII([-2, -2, 1, 1, 4, 1, 4, 4, -4, -2])).toBe(-4);
		expect(singleNumberII([-(2 ** 31), 5, 5, 5])).toBe(-(2 ** 31));
		expect(singleNumberII([2 ** 31 - 1, 0, 0, 0])).toBe(2 ** 31 - 1);
	});

	it("finds the single value among random shuffled triples", () => {
		const random = createRandom(137);
		for (let run = 0; run < 300; run++) {
			const single = random.int(-(2 ** 31), 2 ** 31 - 1);
			const triples = random
				.array(random.int(0, 8), -(2 ** 31), 2 ** 31 - 1)
				.filter((n) => n !== single);
			const nums = [...triples, ...triples, ...triples, single].toSorted(
				() => random.next() - 0.5,
			);
			expect(singleNumberII(nums)).toBe(single);
		}
	});
});
