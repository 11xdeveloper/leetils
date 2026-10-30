import { describe, expect, it } from "bun:test";
import { usingARobotToPrintTheLexicographicallySmallestString as robotWithString } from ".";

describe("2434. Using a Robot to Print the Lexicographically Smallest String", () => {
	it("solves the examples from the problem statement", () => {
		expect(robotWithString("zza")).toBe("azz");
		expect(robotWithString("bac")).toBe("abc");
		expect(robotWithString("bdda")).toBe("addb");
	});
});
