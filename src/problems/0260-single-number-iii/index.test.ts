import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { singleNumberIII } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("260. Single Number III", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(singleNumberIII([1, 2, 1, 3, 2, 5]))).toEqual([3, 5]);
		expect(sorted(singleNumberIII([-1, 0]))).toEqual([-1, 0]);
		expect(sorted(singleNumberIII([0, 1]))).toEqual([0, 1]);
	});

	it("handles the 32-bit limits", () => {
		expect(sorted(singleNumberIII([-(2 ** 31), 2 ** 31 - 1]))).toEqual([
			-(2 ** 31),
			2 ** 31 - 1,
		]);
	});

	it("finds both singles among random shuffled pairs", () => {
		const random = createRandom(260);
		for (let run = 0; run < 500; run++) {
			const a = random.int(-(2 ** 31), 2 ** 31 - 1);
			let b = random.int(-(2 ** 31), 2 ** 31 - 1);
			if (b === a) b = a === 0 ? 1 : 0;
			const pairs = random
				.array(random.int(0, 8), -100, 100)
				.filter((n) => n !== a && n !== b);
			const nums = [...pairs, ...pairs, a, b].toSorted(
				() => random.next() - 0.5,
			);
			expect(sorted(singleNumberIII(nums))).toEqual(sorted([a, b]));
		}
	});
});
