import { describe, expect, it } from "bun:test";
import {
	type NestedArray,
	nestedListFromArray,
} from "../../structures/nested-integer";
import { createRandom, type Random } from "../../testing/random";
import { nestedListWeightSum } from ".";

const byRecursion = (values: NestedArray, depth = 1): number =>
	values.reduce<number>(
		(sum, value) =>
			sum +
			(typeof value === "number"
				? value * depth
				: byRecursion(value, depth + 1)),
		0,
	);

const randomNested = (random: Random, depth: number): NestedArray =>
	Array.from({ length: random.int(1, 4) }, () =>
		depth > 0 && random.int(0, 2) === 0
			? randomNested(random, depth - 1)
			: random.int(-100, 100),
	);

describe("339. Nested List Weight Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(nestedListWeightSum(nestedListFromArray([[1, 1], 2, [1, 1]]))).toBe(
			10,
		);
		expect(nestedListWeightSum(nestedListFromArray([1, [4, [6]]]))).toBe(27);
		expect(nestedListWeightSum(nestedListFromArray([0]))).toBe(0);
	});

	it("handles empty lists", () => {
		expect(nestedListWeightSum(nestedListFromArray([[], [[]], 3]))).toBe(3);
	});

	it("matches a recursive sum on random nested lists", () => {
		const random = createRandom(339);
		for (let run = 0; run < 500; run++) {
			const values = randomNested(random, 4);
			expect(nestedListWeightSum(nestedListFromArray(values))).toBe(
				byRecursion(values),
			);
		}
	});
});
