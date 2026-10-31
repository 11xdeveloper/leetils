import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { findTheMinimumAndMaximumNumberOfNodesBetweenCriticalPoints as criticalDistances } from ".";

const distances = (values: number[]): number[] =>
	criticalDistances(listFromArray(values));

describe("2058. Find the Minimum and Maximum Number of Nodes Between Critical Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(distances([3, 1])).toEqual([-1, -1]);
		expect(distances([5, 3, 1, 2, 5, 1, 2])).toEqual([1, 3]);
		expect(distances([1, 3, 2, 2, 3, 2, 2, 2, 7])).toEqual([3, 3]);
	});

	it("needs strict extremes", () => {
		expect(distances([1, 2, 2, 1])).toEqual([-1, -1]);
		expect(distances([1, 2, 1, 2, 1])).toEqual([1, 2]);
	});
});
