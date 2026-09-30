import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { toLowerCase } from ".";

describe("709. To Lower Case", () => {
	it("solves the examples from the problem statement", () => {
		expect(toLowerCase("Hello")).toBe("hello");
		expect(toLowerCase("here")).toBe("here");
		expect(toLowerCase("LOVELY")).toBe("lovely");
	});

	it("matches String.prototype.toLowerCase on random printable ASCII", () => {
		const random = createRandom(709);
		const printable = Array.from({ length: 95 }, (_, i) =>
			String.fromCharCode(32 + i),
		).join("");
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 30), printable);
			expect(toLowerCase(s)).toBe(s.toLowerCase());
		}
	});
});
