import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsets } from "../0078-subsets";
import { subsetsII } from ".";

const normalize = (all: number[][]): string[] =>
	all.map((subset) => subset.toSorted((a, b) => a - b).join(",")).toSorted();

describe("90. Subsets II", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsetsII([1, 2, 2])).toEqual([
			[],
			[1],
			[2],
			[1, 2],
			[2, 2],
			[1, 2, 2],
		]);
		expect(subsetsII([0])).toEqual([[], [0]]);
	});

	it("returns n + 1 subsets when every value is the same", () => {
		expect(subsetsII([4, 4, 4])).toEqual([[], [4], [4, 4], [4, 4, 4]]);
	});

	it("matches deduplicating every subset on random inputs", () => {
		const random = createRandom(90);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -2, 2);
			const results = subsetsII(nums);
			expect(new Set(normalize(results)).size).toBe(results.length);
			expect(normalize(results)).toEqual(
				[...new Set(normalize(subsets(nums)))].toSorted(),
			);
		}
	});
});
