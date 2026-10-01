import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { convertANumberToHexadecimal as toHex } from ".";

describe("405. Convert a Number to Hexadecimal", () => {
	it("solves the examples from the problem statement", () => {
		expect(toHex(26)).toBe("1a");
		expect(toHex(-1)).toBe("ffffffff");
	});

	it("handles zero and the 32-bit limits", () => {
		expect(toHex(0)).toBe("0");
		expect(toHex(2 ** 31 - 1)).toBe("7fffffff");
		expect(toHex(-(2 ** 31))).toBe("80000000");
	});

	it("agrees with Number.prototype.toString on the unsigned value", () => {
		const random = createRandom(405);
		for (let run = 0; run < 2000; run++) {
			const num = random.int(-(2 ** 31), 2 ** 31 - 1);
			expect(toHex(num)).toBe((num >>> 0).toString(16));
		}
	});
});
