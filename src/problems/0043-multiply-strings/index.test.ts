import { describe, expect, it } from "bun:test";
import { multiplyStrings } from ".";

const byBigInt = (a: string, b: string): string =>
	String(BigInt(a) * BigInt(b));

describe("43. Multiply Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(multiplyStrings("2", "3")).toBe("6");
		expect(multiplyStrings("123", "456")).toBe("56088");
	});

	it("returns 0 when either number is 0", () => {
		expect(multiplyStrings("0", "0")).toBe("0");
		expect(multiplyStrings("0", "9999")).toBe("0");
		expect(multiplyStrings("9999", "0")).toBe("0");
	});

	it("carries across many digits", () => {
		expect(multiplyStrings("9", "9")).toBe("81");
		expect(multiplyStrings("999", "999")).toBe("998001");
		expect(multiplyStrings("10", "10")).toBe("100");
	});

	it("handles products too large for a JavaScript number", () => {
		const a = "9".repeat(200);
		const b = "8".repeat(200);
		expect(multiplyStrings(a, b)).toBe(byBigInt(a, b));
	});

	it("agrees with BigInt multiplication on random inputs", () => {
		let seed = 43;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		const randomNumber = () => {
			const digits = Array.from(
				{ length: 1 + (next() % 25) },
				() => next() % 10,
			);
			return String(BigInt(digits.join("")));
		};
		for (let run = 0; run < 500; run++) {
			const a = randomNumber();
			const b = randomNumber();
			expect(multiplyStrings(a, b)).toBe(byBigInt(a, b));
		}
	});
});
