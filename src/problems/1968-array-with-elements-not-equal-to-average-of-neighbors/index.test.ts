import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrayWithElementsNotEqualToAverageOfNeighbors as rearrangeArray } from ".";

const isValid = (original: number[], result: number[]) =>
	result.toSorted((a, b) => a - b).join() ===
		original.toSorted((a, b) => a - b).join() &&
	result.every(
		(v, i) =>
			i === 0 ||
			i === result.length - 1 ||
			2 * v !== (result[i - 1] ?? 0) + (result[i + 1] ?? 0),
	);

describe("1968. Array With Elements Not Equal to Average of Neighbors", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isValid([1, 2, 3, 4, 5], rearrangeArray([1, 2, 3, 4, 5])),
		).toBeTrue();
		expect(
			isValid([6, 2, 0, 9, 7], rearrangeArray([6, 2, 0, 9, 7])),
		).toBeTrue();
	});

	it("produces a valid arrangement of random distinct arrays", () => {
		const random = createRandom(1968);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(3, 15), 0, 30))];
			expect(isValid(nums, rearrangeArray(nums))).toBeTrue();
		}
	});
});
