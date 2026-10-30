import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { maximumTwinSumOfALinkedList as pairSum } from ".";

describe("2130. Maximum Twin Sum of a Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(pairSum(listFromArray([5, 4, 2, 1]))).toBe(6);
		expect(pairSum(listFromArray([4, 2, 2, 3]))).toBe(7);
		expect(pairSum(listFromArray([1, 100000]))).toBe(100001);
	});
});
