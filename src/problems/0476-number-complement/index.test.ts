import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberComplement as findComplement } from ".";

const byStrings = (num: number): number =>
	Number.parseInt(
		[...num.toString(2)].map((bit) => (bit === "0" ? "1" : "0")).join(""),
		2,
	);

describe("476. Number Complement", () => {
	it("solves the examples from the problem statement", () => {
		expect(findComplement(5)).toBe(2);
		expect(findComplement(1)).toBe(0);
	});

	it("handles the largest input", () => {
		expect(findComplement(2 ** 31 - 1)).toBe(0);
		expect(findComplement(2 ** 30)).toBe(2 ** 30 - 1);
	});

	it("matches flipping the binary string on random inputs", () => {
		const random = createRandom(476);
		for (let run = 0; run < 1000; run++) {
			const num = random.int(1, 2 ** 31 - 1);
			expect(findComplement(num)).toBe(byStrings(num));
		}
	});
});
