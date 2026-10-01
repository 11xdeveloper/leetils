import { describe, expect, it } from "bun:test";
import { dayOfTheYear as dayOfYear } from ".";

describe("1154. Day of the Year", () => {
	it("solves the examples from the problem statement", () => {
		expect(dayOfYear("2019-01-09")).toBe(9);
		expect(dayOfYear("2019-02-10")).toBe(41);
	});

	it("matches counting days with Date for every day from 1900 to 2019", () => {
		const day = 24 * 60 * 60 * 1000;
		for (
			let time = Date.UTC(1900, 0, 1);
			time <= Date.UTC(2019, 11, 31);
			time += day
		) {
			const date = new Date(time);
			const start = Date.UTC(date.getUTCFullYear(), 0, 1);
			expect(dayOfYear(date.toISOString().slice(0, 10))).toBe(
				(time - start) / day + 1,
			);
		}
	});
});
