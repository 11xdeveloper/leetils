import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fractionAdditionAndSubtraction as fractionAddition } from ".";

describe("592. Fraction Addition and Subtraction", () => {
	it("solves the examples from the problem statement", () => {
		expect(fractionAddition("-1/2+1/2")).toBe("0/1");
		expect(fractionAddition("-1/2+1/2+1/3")).toBe("1/3");
		expect(fractionAddition("1/3-1/2")).toBe("-1/6");
	});

	it("writes integers over 1", () => {
		expect(fractionAddition("5/3+1/3")).toBe("2/1");
		expect(fractionAddition("-10/1")).toBe("-10/1");
	});

	it("matches exact rational arithmetic on random expressions", () => {
		const random = createRandom(592);
		const gcd = (a: bigint, b: bigint): bigint =>
			b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b);
		for (let run = 0; run < 1000; run++) {
			let expression = "";
			let top = 0n;
			let bottom = 1n;
			for (let i = random.int(1, 10); i > 0; i--) {
				const numerator = random.int(0, 10);
				const denominator = random.int(1, 10);
				const negative = random.int(0, 1) === 1;
				expression += `${negative ? "-" : expression === "" ? "" : "+"}${numerator}/${denominator}`;
				top =
					top * BigInt(denominator) +
					(negative ? -1n : 1n) * BigInt(numerator) * bottom;
				bottom *= BigInt(denominator);
			}
			const divisor = gcd(top, bottom);
			expect(fractionAddition(expression)).toBe(
				`${top / divisor}/${bottom / divisor}`,
			);
		}
	});
});
