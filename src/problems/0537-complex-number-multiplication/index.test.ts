import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { complexNumberMultiplication as multiply } from ".";

describe("537. Complex Number Multiplication", () => {
	it("solves the examples from the problem statement", () => {
		expect(multiply("1+1i", "1+1i")).toBe("0+2i");
		expect(multiply("1+-1i", "1+-1i")).toBe("0+-2i");
	});

	it("multiplies random complex numbers", () => {
		const random = createRandom(537);
		for (let run = 0; run < 1000; run++) {
			const [a, b, c, d] = random.array(4, -100, 100) as [
				number,
				number,
				number,
				number,
			];
			expect(multiply(`${a}+${b}i`, `${c}+${d}i`)).toBe(
				`${a * c - b * d}+${a * d + b * c}i`,
			);
		}
	});
});
