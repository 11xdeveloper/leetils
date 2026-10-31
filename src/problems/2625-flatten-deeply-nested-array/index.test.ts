import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { flattenDeeplyNestedArray } from ".";

type Nested = (number | Nested)[];

describe("2625. Flatten Deeply Nested Array", () => {
	const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

	it("solves the examples from the problem statement", () => {
		expect(flattenDeeplyNestedArray(arr, 0)).toEqual(arr);
		expect(flattenDeeplyNestedArray(arr, 1)).toEqual([
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			[9, 10, 11],
			12,
			13,
			14,
			15,
		]);
		expect(
			flattenDeeplyNestedArray(
				[
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, [9, 10, 11], 12],
				],
				2,
			),
		).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	});

	it("matches Array.prototype.flat on random arrays", () => {
		const random = createRandom(2625);
		const build = (depth: number): Nested =>
			Array.from({ length: random.int(0, 4) }, () =>
				depth > 0 && random.int(0, 2) === 0
					? build(depth - 1)
					: random.int(0, 9),
			);
		for (let i = 0; i < 200; i++) {
			const nested = build(4);
			const n = random.int(0, 5);
			const flat: unknown[] = (nested as unknown[]).flat(n);
			expect<unknown[]>(flattenDeeplyNestedArray(nested, n)).toEqual(flat);
		}
	});
});
