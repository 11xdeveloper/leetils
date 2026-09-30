import { describe, expect, it } from "bun:test";
import { dayOfTheWeek } from ".";

const names = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

describe("1185. Day of the Week", () => {
	it("solves the examples from the problem statement", () => {
		expect(dayOfTheWeek(31, 8, 2019)).toBe("Saturday");
		expect(dayOfTheWeek(18, 7, 1999)).toBe("Sunday");
		expect(dayOfTheWeek(15, 8, 1993)).toBe("Sunday");
	});

	it("matches Date for every day from 1971 to 2100", () => {
		const oneDay = 24 * 60 * 60 * 1000;
		for (
			let time = Date.UTC(1971, 0, 1);
			time <= Date.UTC(2100, 11, 31);
			time += oneDay
		) {
			const date = new Date(time);
			expect(
				dayOfTheWeek(
					date.getUTCDate(),
					date.getUTCMonth() + 1,
					date.getUTCFullYear(),
				),
			).toBe(names[date.getUTCDay()] ?? "");
		}
	});
});
