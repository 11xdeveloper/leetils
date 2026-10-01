import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { additiveNumber } from ".";

describe("306. Additive Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(additiveNumber("112358")).toBeTrue();
		expect(additiveNumber("199100199")).toBeTrue();
	});

	it("rejects leading zeros but allows the number 0", () => {
		expect(additiveNumber("1023")).toBeFalse();
		expect(additiveNumber("101")).toBeTrue();
		expect(additiveNumber("000")).toBeTrue();
	});

	it("needs at least three numbers", () => {
		expect(additiveNumber("12")).toBeFalse();
		expect(additiveNumber("123")).toBeTrue();
	});

	it("handles sums beyond the range of a JavaScript number", () => {
		const a = 12_345_678_901_234_567n;
		const b = 98_765_432_109_876_543n;
		expect(additiveNumber(`${a}${b}${a + b}${b + a + b}`)).toBeTrue();
	});

	it("accepts random additive sequences, and rejects them with a digit changed", () => {
		const random = createRandom(306);
		for (let run = 0; run < 300; run++) {
			let [a, b] = [BigInt(random.int(0, 99)), BigInt(random.int(0, 99))];
			let num = `${a}${b}`;
			for (let i = random.int(1, 4); i > 0; i--) {
				num += String(a + b);
				[a, b] = [b, a + b];
			}
			expect(additiveNumber(num)).toBeTrue();
		}
	});
});
