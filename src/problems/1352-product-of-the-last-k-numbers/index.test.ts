import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ProductOfTheLastKNumbers as ProductOfNumbers } from ".";

describe("1352. Product of the Last K Numbers", () => {
	it("solves the example from the problem statement", () => {
		const stream = new ProductOfNumbers();
		for (const num of [3, 0, 2, 5, 4]) stream.add(num);
		expect(stream.getProduct(2)).toBe(20);
		expect(stream.getProduct(3)).toBe(40);
		expect(stream.getProduct(4)).toBe(0);
		stream.add(8);
		expect(stream.getProduct(2)).toBe(32);
	});

	it("matches multiplying the tail on random streams", () => {
		const random = createRandom(1352);
		for (let run = 0; run < 100; run++) {
			const stream = new ProductOfNumbers();
			const added: number[] = [];
			for (let op = 0; op < 40; op++) {
				if (added.length === 0 || random.next() < 0.6) {
					const num = random.next() < 0.1 ? 0 : random.int(1, 4);
					stream.add(num);
					added.push(num);
				} else {
					const k = random.int(1, Math.min(added.length, 10));
					expect(stream.getProduct(k)).toBe(
						added.slice(-k).reduce((p, x) => p * x, 1),
					);
				}
			}
		}
	});
});
