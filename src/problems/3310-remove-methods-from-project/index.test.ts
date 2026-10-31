import { describe, expect, it } from "bun:test";
import { removeMethodsFromProject as remainingMethods } from ".";

describe("3310. Remove Methods From Project", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			remainingMethods(4, 1, [
				[1, 2],
				[0, 1],
				[3, 2],
			]),
		).toEqual([0, 1, 2, 3]);
		expect(
			remainingMethods(5, 0, [
				[1, 2],
				[0, 2],
				[0, 1],
				[3, 4],
			]),
		).toEqual([3, 4]);
		expect(
			remainingMethods(3, 2, [
				[1, 2],
				[0, 1],
				[2, 0],
			]),
		).toEqual([]);
	});
});
