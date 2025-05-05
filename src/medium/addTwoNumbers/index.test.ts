import { test, expect, describe } from "bun:test";
import { addTwoNumbers } from ".";
import { listNodeFromArray } from "../../lib/utils";

describe("Add Two Numbers", () => {
	test(`You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`, () => {
		expect(
			addTwoNumbers(listNodeFromArray([2, 4, 3]), listNodeFromArray([5, 6, 4])),
		).toEqual(listNodeFromArray([7, 0, 8]));
		expect(
			addTwoNumbers(listNodeFromArray([0]), listNodeFromArray([0])),
		).toEqual(listNodeFromArray([0]));
		expect(
			addTwoNumbers(
				listNodeFromArray([9, 9, 9, 9, 9, 9, 9]),
				listNodeFromArray([9, 9, 9, 9]),
			),
		).toEqual(listNodeFromArray([8, 9, 9, 9, 0, 0, 0, 1]));
	});
});
