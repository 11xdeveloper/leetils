import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { superPow } from ".";

/** Exact modular exponentiation with BigInt. */
const byBigInt = (a: number, b: number[]): number => {
	let result = 1n;
	let base = BigInt(a) % 1337n;
	for (let exponent = BigInt(b.join("")); exponent > 0n; exponent /= 2n) {
		if (exponent % 2n === 1n) result = (result * base) % 1337n;
		base = (base * base) % 1337n;
	}
	return Number(result);
};

describe("372. Super Pow", () => {
	it("solves the examples from the problem statement", () => {
		expect(superPow(2, [3])).toBe(8);
		expect(superPow(2, [1, 0])).toBe(1024);
		expect(superPow(1, [4, 3, 3, 8, 5, 2])).toBe(1);
		expect(superPow(2147483647, [2, 0, 0])).toBe(1198);
	});

	it("handles a multiple of 1337", () => {
		expect(superPow(1337, [1, 2])).toBe(0);
	});

	it("matches BigInt exponentiation on random inputs with long exponents", () => {
		const random = createRandom(372);
		for (let run = 0; run < 300; run++) {
			const a = random.int(1, 2 ** 31 - 1);
			const b = [random.int(1, 9), ...random.array(random.int(0, 40), 0, 9)];
			expect(superPow(a, b)).toBe(byBigInt(a, b));
		}
	});
});
