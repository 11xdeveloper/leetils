import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfDaysBetweenTwoDates as daysBetweenDates } from ".";

describe("1360. Number of Days Between Two Dates", () => {
	it("solves the examples from the problem statement", () => {
		expect(daysBetweenDates("2019-06-29", "2019-06-30")).toBe(1);
		expect(daysBetweenDates("2020-01-15", "2019-12-31")).toBe(15);
	});

	it("matches Date arithmetic on random dates", () => {
		const random = createRandom(1360);
		const day = 24 * 60 * 60 * 1000;
		const [first, last] = [Date.UTC(1971, 0, 1), Date.UTC(2100, 11, 31)];
		for (let run = 0; run < 500; run++) {
			const [a, b] = [
				random.int(0, (last - first) / day),
				random.int(0, (last - first) / day),
			];
			const format = (offset: number) =>
				new Date(first + offset * day).toISOString().slice(0, 10);
			expect(daysBetweenDates(format(a), format(b))).toBe(Math.abs(a - b));
		}
	});
});
