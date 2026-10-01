import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { convertBinaryNumberInALinkedListToInteger as getDecimalValue } from ".";

describe("1290. Convert Binary Number in a Linked List to Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(getDecimalValue(listFromArray([1, 0, 1]))).toBe(5);
		expect(getDecimalValue(listFromArray([0]))).toBe(0);
	});

	it("handles thirty bits", () => {
		expect(getDecimalValue(listFromArray(new Array<number>(30).fill(1)))).toBe(
			2 ** 30 - 1,
		);
	});
});
