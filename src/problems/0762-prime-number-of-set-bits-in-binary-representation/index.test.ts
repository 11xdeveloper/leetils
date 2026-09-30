import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { primeNumberOfSetBitsInBinaryRepresentation as countPrimeSetBits } from ".";

const isPrime = (n: number): boolean =>
	n > 1 &&
	Array.from({ length: n - 2 }, (_, i) => i + 2).every((d) => n % d !== 0);

describe("762. Prime Number of Set Bits in Binary Representation", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPrimeSetBits(6, 10)).toBe(4);
		expect(countPrimeSetBits(10, 15)).toBe(5);
	});

	it("matches counting ones in binary strings on random ranges", () => {
		const random = createRandom(762);
		for (let run = 0; run < 200; run++) {
			const left = random.int(1, 10 ** 6 - 1000);
			const right = left + random.int(0, 1000);
			let expected = 0;
			for (let num = left; num <= right; num++)
				if (isPrime([...num.toString(2)].filter((bit) => bit === "1").length))
					expected++;
			expect(countPrimeSetBits(left, right)).toBe(expected);
		}
	});
});
