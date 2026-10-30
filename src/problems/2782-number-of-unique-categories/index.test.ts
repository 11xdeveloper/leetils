import { describe, expect, it } from "bun:test";
import { numberOfUniqueCategories } from ".";

const handler = (categories: number[]) => ({
	haveSameCategory: (a: number, b: number) => categories[a] === categories[b],
});

describe("2782. Number of Unique Categories", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfUniqueCategories(6, handler([1, 1, 2, 2, 3, 3]))).toBe(3);
		expect(numberOfUniqueCategories(5, handler([1, 2, 3, 4, 5]))).toBe(5);
		expect(numberOfUniqueCategories(3, handler([1, 1, 1]))).toBe(1);
	});
});
