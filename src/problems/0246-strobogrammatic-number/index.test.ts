import { describe, expect, it } from "bun:test";
import { strobogrammaticNumber } from ".";

const ROTATED: Record<string, string> = {
	0: "0",
	1: "1",
	6: "9",
	8: "8",
	9: "6",
};

/** Rotates the whole number and compares. */
const byRotating = (num: string): boolean =>
	[...num].every((d) => d in ROTATED) &&
	[...num]
		.reverse()
		.map((d) => ROTATED[d])
		.join("") === num;

describe("246. Strobogrammatic Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(strobogrammaticNumber("69")).toBeTrue();
		expect(strobogrammaticNumber("88")).toBeTrue();
		expect(strobogrammaticNumber("962")).toBeFalse();
	});

	it("checks the middle digit of odd-length numbers", () => {
		expect(strobogrammaticNumber("818")).toBeTrue();
		expect(strobogrammaticNumber("6")).toBeFalse();
		expect(strobogrammaticNumber("0")).toBeTrue();
	});

	it("matches rotating the whole number for every number below 100,000", () => {
		for (let n = 0; n < 100_000; n++) {
			expect(strobogrammaticNumber(String(n))).toBe(byRotating(String(n)));
		}
	});
});
