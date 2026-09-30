import { describe, expect, it } from "bun:test";
import { stringsUpTo } from "../../testing/random";
import { encodeNumber as encode } from ".";

describe("1256. Encode Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(encode(23)).toBe("1000");
		expect(encode(107)).toBe("101100");
	});

	it("matches listing binary strings shortest first", () => {
		const table = stringsUpTo(["0", "1"], 10);
		table.forEach((expected, num) => {
			expect(encode(num)).toBe(expected);
		});
	});

	it("handles 10^9", () => {
		// 2^29 - 1 ≤ 10^9 < 2^30 - 1, so its code is one of the 29-bit strings.
		expect(encode(10 ** 9)).toHaveLength(29);
		expect(encode(2 ** 29 - 1)).toBe("0".repeat(29));
		expect(encode(2 ** 30 - 2)).toBe("1".repeat(29));
	});
});
