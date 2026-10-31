import { describe, expect, it } from "bun:test";
import { dateRangeGenerator } from ".";

describe("2777. Date Range Generator", () => {
	it("solves the examples from the problem statement", () => {
		expect([...dateRangeGenerator("2023-04-01", "2023-04-04", 1)]).toEqual([
			"2023-04-01",
			"2023-04-02",
			"2023-04-03",
			"2023-04-04",
		]);
		expect([...dateRangeGenerator("2023-04-10", "2023-04-20", 3)]).toEqual([
			"2023-04-10",
			"2023-04-13",
			"2023-04-16",
			"2023-04-19",
		]);
		expect([...dateRangeGenerator("2023-04-10", "2023-04-10", 1)]).toEqual([
			"2023-04-10",
		]);
	});

	it("crosses month and year ends", () => {
		expect([...dateRangeGenerator("2023-12-30", "2024-03-01", 31)]).toEqual([
			"2023-12-30",
			"2024-01-30",
			"2024-03-01",
		]);
	});
});
