import { describe, expect, it } from "bun:test";
import { findTheKThLuckyNumber as kthLuckyNumber } from ".";

describe("2802. Find The K-th Lucky Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthLuckyNumber(4)).toBe("47");
		expect(kthLuckyNumber(10)).toBe("477");
		expect(kthLuckyNumber(1000)).toBe("777747447");
	});

	it("lists lucky numbers in order", () => {
		const lucky: string[] = [];
		for (let x = 1; lucky.length < 30; x++)
			if (/^[47]+$/.test(String(x))) lucky.push(String(x));
		expect(lucky.map((_, i) => kthLuckyNumber(i + 1))).toEqual(lucky);
	});
});
