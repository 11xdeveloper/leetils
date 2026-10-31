import { describe, expect, it } from "bun:test";
import { propertiesGraph as numberOfComponents } from ".";

describe("3493. Properties Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfComponents(
				[
					[1, 2],
					[1, 1],
					[3, 4],
					[4, 5],
					[5, 6],
					[7, 7],
				],
				1,
			),
		).toBe(3);
		expect(
			numberOfComponents(
				[
					[1, 2, 3],
					[2, 3, 4],
					[4, 3, 5],
				],
				2,
			),
		).toBe(1);
		expect(
			numberOfComponents(
				[
					[1, 1],
					[1, 1],
				],
				2,
			),
		).toBe(2);
	});
});
