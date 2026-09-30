import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { complementOfBase10Integer as bitwiseComplement } from ".";

describe("1009. Complement of Base 10 Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(bitwiseComplement(5)).toBe(2);
		expect(bitwiseComplement(7)).toBe(0);
		expect(bitwiseComplement(10)).toBe(5);
	});

	it("handles 0 and matches flipping binary strings", () => {
		expect(bitwiseComplement(0)).toBe(1);
		const random = createRandom(1009);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 10 ** 9);
			expect(bitwiseComplement(n)).toBe(
				Number.parseInt(
					[...n.toString(2)].map((b) => (b === "0" ? "1" : "0")).join(""),
					2,
				),
			);
		}
	});
});
