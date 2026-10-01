import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reverseBits } from ".";

const byString = (n: number): number =>
	Number.parseInt([...n.toString(2).padStart(32, "0")].reverse().join(""), 2);

describe("190. Reverse Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseBits(43261596)).toBe(964176192);
		expect(reverseBits(2147483644)).toBe(1073741822);
	});

	it("handles 0, 1 and all bits set", () => {
		expect(reverseBits(0)).toBe(0);
		expect(reverseBits(1)).toBe(2 ** 31);
		expect(reverseBits(2 ** 32 - 1)).toBe(2 ** 32 - 1);
	});

	it("agrees with reversing the binary string on random inputs", () => {
		const random = createRandom(190);
		for (let run = 0; run < 2000; run++) {
			const n = random.int(0, 2 ** 32 - 1);
			expect(reverseBits(n)).toBe(byString(n));
		}
	});
});
