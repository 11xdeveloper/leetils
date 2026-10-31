import { describe, expect, it } from "bun:test";
import { nextDay } from ".";

describe("2758. Next Day", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextDay.call(new Date("2014-06-20"))).toBe("2014-06-21");
		expect(nextDay.call(new Date("2017-10-31"))).toBe("2017-11-01");
	});

	it("crosses years and leap days", () => {
		expect(nextDay.call(new Date("1999-12-31"))).toBe("2000-01-01");
		expect(nextDay.call(new Date("2024-02-28"))).toBe("2024-02-29");
		expect(nextDay.call(new Date("2023-02-28"))).toBe("2023-03-01");
	});
});
