import { describe, expect, it } from "bun:test";
import {
	type NestedArray,
	type NestedInteger,
	nestedListToArray,
} from "../../structures/nested-integer";
import { createRandom, type Random } from "../../testing/random";
import { miniParser } from ".";

const toValue = (nested: NestedInteger): number | NestedArray =>
	nested.getInteger() ?? nestedListToArray(nested.getList());

const randomNested = (random: Random, depth: number): NestedArray =>
	Array.from({ length: random.int(0, 3) }, () =>
		depth > 0 && random.int(0, 2) === 0
			? randomNested(random, depth - 1)
			: random.int(-1000, 1000),
	);

describe("385. Mini Parser", () => {
	it("solves the examples from the problem statement", () => {
		expect(toValue(miniParser("324"))).toBe(324);
		expect(toValue(miniParser("[123,[456,[789]]]"))).toEqual([
			123,
			[456, [789]],
		]);
	});

	it("parses negative numbers and empty lists", () => {
		expect(toValue(miniParser("-3"))).toBe(-3);
		expect(toValue(miniParser("[-1,[],[[]],0]"))).toEqual([-1, [], [[]], 0]);
	});

	it("round-trips random nested lists written as JSON", () => {
		const random = createRandom(385);
		for (let run = 0; run < 500; run++) {
			const values = randomNested(random, 4);
			expect(toValue(miniParser(JSON.stringify(values)))).toEqual(values);
		}
	});
});
