import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestGoodBase } from ".";

const isGoodBase = (n: bigint, base: bigint): boolean => {
	for (let rest = n; rest > 0n; rest /= base)
		if (rest % base !== 1n) return false;
	return true;
};

describe("483. Smallest Good Base", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestGoodBase("13")).toBe("3");
		expect(smallestGoodBase("4681")).toBe("8");
		expect(smallestGoodBase("1000000000000000000")).toBe("999999999999999999");
	});

	it("matches trying every base for small n", () => {
		for (let n = 3n; n <= 3000n; n++) {
			let base = 2n;
			while (!isGoodBase(n, base)) base++;
			expect(smallestGoodBase(String(n))).toBe(String(base));
		}
	});

	it("finds a base at most k for numbers made of ones in base k", () => {
		const random = createRandom(483);
		for (let run = 0; run < 500; run++) {
			const base = BigInt(random.int(2, 10 ** 6));
			let n = 0n;
			for (let power = 1n; n + power <= 10n ** 18n; power *= base) n += power;
			const result = BigInt(smallestGoodBase(String(n)));
			expect(result <= base).toBeTrue();
			expect(isGoodBase(n, result)).toBeTrue();
		}
	});
});
