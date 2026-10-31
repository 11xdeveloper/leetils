import { describe, expect, it } from "bun:test";
import { aliceAndBobPlayingFlowerGame as flowerGame } from ".";

describe("3021. Alice and Bob Playing Flower Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(flowerGame(3, 2)).toBe(3);
		expect(flowerGame(1, 1)).toBe(0);
	});

	it("counts odd sums", () => {
		for (let n = 1; n <= 8; n++)
			for (let m = 1; m <= 8; m++) {
				let count = 0;
				for (let x = 1; x <= n; x++)
					for (let y = 1; y <= m; y++) count += (x + y) % 2;
				expect(flowerGame(n, m)).toBe(count);
			}
		expect(flowerGame(100000, 100000)).toBe(5000000000);
	});
});
