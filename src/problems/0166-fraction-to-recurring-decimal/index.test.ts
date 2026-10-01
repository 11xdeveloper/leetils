import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fractionToRecurringDecimal } from ".";

const gcd = (a: bigint, b: bigint): bigint =>
	b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b);

/** Parses "-12.34(56)" back into a reduced fraction, as a string "n/d". */
const parse = (decimal: string): string => {
	const match = /^(-?)(\d+)(?:\.(\d*)(?:\((\d+)\))?)?$/.exec(decimal);
	if (!match) throw new Error(`Malformed decimal ${decimal}`);
	const [, sign = "", whole = "0", fixed = "", repeating = ""] = match;
	const fixedScale = 10n ** BigInt(fixed.length);
	// whole + fixed / 10^f + repeating / (10^f * (10^r - 1))
	let n = BigInt(whole) * fixedScale + BigInt(fixed || "0");
	let d = fixedScale;
	if (repeating) {
		const repeatScale = 10n ** BigInt(repeating.length) - 1n;
		n = n * repeatScale + BigInt(repeating);
		d *= repeatScale;
	}
	if (sign) n = -n;
	const divisor = gcd(n, d);
	return `${n / divisor}/${d / divisor}`;
};

const reduced = (n: number, d: number): string => {
	let [top, bottom] = [BigInt(n), BigInt(d)];
	if (bottom < 0n) [top, bottom] = [-top, -bottom];
	const divisor = gcd(top, bottom);
	return `${top / divisor}/${bottom / divisor}`;
};

describe("166. Fraction to Recurring Decimal", () => {
	it("solves the examples from the problem statement", () => {
		expect(fractionToRecurringDecimal(1, 2)).toBe("0.5");
		expect(fractionToRecurringDecimal(2, 1)).toBe("2");
		expect(fractionToRecurringDecimal(4, 333)).toBe("0.(012)");
	});

	it("puts only the repeating part in parentheses", () => {
		expect(fractionToRecurringDecimal(1, 6)).toBe("0.1(6)");
		expect(fractionToRecurringDecimal(22, 7)).toBe("3.(142857)");
	});

	it("handles signs and zero", () => {
		expect(fractionToRecurringDecimal(-50, 8)).toBe("-6.25");
		expect(fractionToRecurringDecimal(7, -12)).toBe("-0.58(3)");
		expect(fractionToRecurringDecimal(0, -5)).toBe("0");
	});

	it("handles the 32-bit limits", () => {
		expect(fractionToRecurringDecimal(-(2 ** 31), -1)).toBe("2147483648");
		expect(fractionToRecurringDecimal(-1, -(2 ** 31))).toBe(
			"0.0000000004656612873077392578125",
		);
	});

	it("round-trips to the same fraction on random inputs", () => {
		const random = createRandom(166);
		for (let run = 0; run < 2000; run++) {
			const numerator = random.int(-2000, 2000);
			const denominator =
				random.int(1, 500) * (random.int(0, 1) === 0 ? 1 : -1);
			expect(parse(fractionToRecurringDecimal(numerator, denominator))).toBe(
				reduced(numerator, denominator),
			);
		}
	});
});
