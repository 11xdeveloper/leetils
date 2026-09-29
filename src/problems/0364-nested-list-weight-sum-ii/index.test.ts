import { describe, expect, it } from "bun:test";
import {
	type NestedArray,
	nestedListFromArray,
} from "../../structures/nested-integer";
import { createRandom, type Random } from "../../testing/random";
import { nestedListWeightSumII } from ".";

const maxDepth = (values: NestedArray, depth = 1): number =>
	Math.max(
		0,
		...values.map((value) =>
			typeof value === "number" ? depth : maxDepth(value, depth + 1),
		),
	);

const byDefinition = (values: NestedArray): number => {
	const deepest = maxDepth(values);
	const sum = (list: NestedArray, depth: number): number =>
		list.reduce<number>(
			(total, value) =>
				total +
				(typeof value === "number"
					? value * (deepest - depth + 1)
					: sum(value, depth + 1)),
			0,
		);
	return sum(values, 1);
};

const randomNested = (random: Random, depth: number): NestedArray =>
	Array.from({ length: random.int(1, 4) }, () =>
		depth > 0 && random.int(0, 2) === 0
			? randomNested(random, depth - 1)
			: random.int(-100, 100),
	);

describe("364. Nested List Weight Sum II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			nestedListWeightSumII(nestedListFromArray([[1, 1], 2, [1, 1]])),
		).toBe(8);
		expect(nestedListWeightSumII(nestedListFromArray([1, [4, [6]]]))).toBe(17);
	});

	it("matches computing the maximum depth first on random nested lists", () => {
		const random = createRandom(364);
		for (let run = 0; run < 500; run++) {
			const values = randomNested(random, 4);
			expect(nestedListWeightSumII(nestedListFromArray(values))).toBe(
				byDefinition(values),
			);
		}
	});
});
