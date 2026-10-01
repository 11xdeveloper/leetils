import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumbersOfFunctionCallsToMakeTargetArray as minOperations } from ".";

/** Breadth-first search backwards from nums to zeros (halving all, or subtracting 1 from one). */
const byBruteForce = (nums: number[]): number => {
	let frontier = [nums.join()];
	const seen = new Set(frontier);
	for (let calls = 0; ; calls++) {
		const next: string[] = [];
		for (const key of frontier) {
			const values = key.split(",").map(Number);
			if (values.every((v) => v === 0)) return calls;
			const moves = values.map((v, i) =>
				v > 0 ? values.with(i, v - 1) : undefined,
			);
			if (values.every((v) => v % 2 === 0))
				moves.push(values.map((v) => v / 2));
			for (const move of moves) {
				if (!move || seen.has(move.join())) continue;
				seen.add(move.join());
				next.push(move.join());
			}
		}
		frontier = next;
	}
};

describe("1558. Minimum Numbers of Function Calls to Make Target Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 5])).toBe(5);
		expect(minOperations([2, 2])).toBe(3);
		expect(minOperations([4, 2, 5])).toBe(6);
	});

	it("needs no calls for zeros", () => {
		expect(minOperations([0, 0])).toBe(0);
	});

	it("matches searching backwards on random inputs", () => {
		const random = createRandom(1558);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 3), 0, 12);
			expect(minOperations(nums)).toBe(byBruteForce(nums));
		}
	});
});
