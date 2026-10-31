import { describe, expect, it } from "bun:test";
import { nestedArrayGenerator } from ".";

describe("2649. Nested Array Generator", () => {
	it("solves the examples from the problem statement", () => {
		const generator = nestedArrayGenerator([[[6]], [1, 3], []]);
		expect([
			generator.next().value,
			generator.next().value,
			generator.next().value,
			generator.next().done,
		]).toEqual([6, 1, 3, true]);
		expect([...nestedArrayGenerator([])]).toEqual([]);
	});

	it("flattens deep nesting", () => {
		expect([
			...nestedArrayGenerator([1, [2, [3, [4, [5]]]], [[[]]], 6]),
		]).toEqual([1, 2, 3, 4, 5, 6]);
	});
});
