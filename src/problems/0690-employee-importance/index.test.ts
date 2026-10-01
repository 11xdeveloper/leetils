import { describe, expect, it } from "bun:test";
import { employeeImportance as getImportance } from ".";

const employees = (
	list: [id: number, importance: number, subordinates: number[]][],
) =>
	list.map(([id, importance, subordinates]) => ({
		id,
		importance,
		subordinates,
	}));

describe("690. Employee Importance", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getImportance(
				employees([
					[1, 5, [2, 3]],
					[2, 3, []],
					[3, 3, []],
				]),
				1,
			),
		).toBe(11);
		expect(
			getImportance(
				employees([
					[1, 2, [5]],
					[5, -3, []],
				]),
				5,
			),
		).toBe(-3);
	});

	it("includes indirect subordinates", () => {
		const company = employees([
			[1, 1, [2]],
			[2, 10, [3, 4]],
			[3, 100, []],
			[4, 1000, [5]],
			[5, 10_000, []],
		]);
		expect(getImportance(company, 1)).toBe(11_111);
		expect(getImportance(company, 4)).toBe(11_000);
	});
});
