import { describe, expect, it } from "bun:test";
import { betterCompressionOfString as betterCompression } from ".";

describe("3167. Better Compression of String", () => {
	it("solves the examples from the problem statement", () => {
		expect(betterCompression("a3c9b2c1")).toBe("a3b2c10");
		expect(betterCompression("c2b3a1")).toBe("a1b3c2");
		expect(betterCompression("a2b4c1")).toBe("a2b4c1");
	});
});
