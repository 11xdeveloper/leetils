import { describe, expect, it } from "bun:test";
import {
	NestedInteger,
	nestedListFromArray,
	nestedListToArray,
} from "./nested-integer";

describe("NestedInteger", () => {
	it("holds an integer or a list", () => {
		const integer = new NestedInteger(5);
		expect(integer.isInteger()).toBeTrue();
		expect(integer.getInteger()).toBe(5);
		expect(integer.getList()).toEqual([]);

		const list = new NestedInteger();
		expect(list.isInteger()).toBeFalse();
		expect(list.getInteger()).toBeNull();
		list.add(integer);
		expect(list.getList()).toEqual([integer]);
	});

	it("switches between an integer and a list", () => {
		const nested = new NestedInteger(1);
		nested.add(new NestedInteger(2));
		expect(nested.isInteger()).toBeFalse();
		nested.setInteger(3);
		expect(nested.getInteger()).toBe(3);
		expect(nested.getList()).toEqual([]);
	});
});

describe("nestedListFromArray and nestedListToArray", () => {
	it("round-trip nested arrays, including empty lists", () => {
		for (const values of [
			[],
			[1],
			[[1, 1], 2, [1, 1]],
			[1, [4, [6]]],
			[[], [[]], 0],
		]) {
			expect(nestedListToArray(nestedListFromArray(values))).toEqual(values);
		}
	});
});
