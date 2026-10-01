import { describe, expect, it } from "bun:test";
import {
	type NestedArray,
	nestedListFromArray,
} from "../../structures/nested-integer";
import { createRandom, type Random } from "../../testing/random";
import { FlattenNestedListIterator } from ".";

const drain = (values: NestedArray): number[] => {
	const iterator = new FlattenNestedListIterator(nestedListFromArray(values));
	const result: number[] = [];
	while (iterator.hasNext()) result.push(iterator.next());
	return result;
};

const flatten = (values: NestedArray): number[] =>
	values.flatMap((value) =>
		typeof value === "number" ? [value] : flatten(value),
	);

const randomNested = (random: Random, depth: number): NestedArray =>
	Array.from({ length: random.int(0, 4) }, () =>
		depth > 0 && random.int(0, 2) === 0
			? randomNested(random, depth - 1)
			: random.int(-9, 9),
	);

describe("341. Flatten Nested List Iterator", () => {
	it("solves the examples from the problem statement", () => {
		expect(drain([[1, 1], 2, [1, 1]])).toEqual([1, 1, 2, 1, 1]);
		expect(drain([1, [4, [6]]])).toEqual([1, 4, 6]);
	});

	it("skips empty lists", () => {
		expect(drain([[], [[]], [[], 1, []], []])).toEqual([1]);
		expect(drain([[[]]])).toEqual([]);
	});

	it("allows next without hasNext", () => {
		const iterator = new FlattenNestedListIterator(
			nestedListFromArray([[], [5, [6]]]),
		);
		expect(iterator.next()).toBe(5);
		expect(iterator.next()).toBe(6);
		expect(iterator.hasNext()).toBeFalse();
	});

	it("matches flattening random nested lists", () => {
		const random = createRandom(341);
		for (let run = 0; run < 500; run++) {
			const values = randomNested(random, 4);
			expect(drain(values)).toEqual(flatten(values));
		}
	});
});
