import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { addStrings } from ".";

describe("415. Add Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(addStrings("11", "123")).toBe("134");
		expect(addStrings("456", "77")).toBe("533");
		expect(addStrings("0", "0")).toBe("0");
	});

	it("carries into a new digit", () => {
		expect(addStrings("9999", "1")).toBe("10000");
	});

	it("agrees with BigInt addition on random inputs", () => {
		const random = createRandom(415);
		for (let run = 0; run < 1000; run++) {
			const a = String(BigInt(random.string(random.int(1, 30), "0123456789")));
			const b = String(BigInt(random.string(random.int(1, 30), "0123456789")));
			expect(addStrings(a, b)).toBe(String(BigInt(a) + BigInt(b)));
		}
	});
});
