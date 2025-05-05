import { test, expect, describe } from "bun:test";
import { isHappy } from "../..";

describe("Happy Number", () => {
	test(`A happy number is a number defined by the following process:

    1. Starting with any positive integer, replace the number by the sum of the squares of its digits.
    2. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
    3. Those numbers for which this process ends in 1 are happy.

    Return true if n is a happy number, and false if not.`, () => {
		expect(isHappy(19)).toBe(true);
		expect(isHappy(2)).toBe(false);
	});
});
