import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { base7 as convertToBase7 } from ".";

describe("504. Base 7", () => {
	it("solves the examples from the problem statement", () => {
		expect(convertToBase7(100)).toBe("202");
		expect(convertToBase7(-7)).toBe("-10");
		expect(convertToBase7(0)).toBe("0");
	});

	it("matches toString(7) on random inputs", () => {
		const random = createRandom(504);
		for (let run = 0; run < 1000; run++) {
			const num = random.int(-(10 ** 7), 10 ** 7);
			expect(convertToBase7(num)).toBe(num.toString(7));
		}
	});
});
