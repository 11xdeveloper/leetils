import { describe, expect, it } from "bun:test";
import { reformatDate } from ".";

describe("1507. Reformat Date", () => {
	it("solves the examples from the problem statement", () => {
		expect(reformatDate("20th Oct 2052")).toBe("2052-10-20");
		expect(reformatDate("6th Jun 1933")).toBe("1933-06-06");
		expect(reformatDate("26th May 1960")).toBe("1960-05-26");
	});

	it("handles every day suffix", () => {
		expect(reformatDate("1st Jan 1900")).toBe("1900-01-01");
		expect(reformatDate("2nd Feb 2000")).toBe("2000-02-02");
		expect(reformatDate("3rd Mar 2001")).toBe("2001-03-03");
		expect(reformatDate("31st Dec 2100")).toBe("2100-12-31");
	});
});
