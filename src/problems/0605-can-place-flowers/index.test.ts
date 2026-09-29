import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { canPlaceFlowers } from ".";

/** The most flowers that fit, trying every set of empty plots. */
const mostFlowers = (flowerbed: number[]): number => {
	let most = 0;
	for (let mask = 0; mask < 1 << flowerbed.length; mask++) {
		const bed = flowerbed.map((plot, i) => (mask & (1 << i) ? plot + 1 : plot));
		if (
			bed.every((plot, i) => plot <= 1 && !(plot === 1 && bed[i + 1] === 1))
		) {
			most = Math.max(
				most,
				bed.filter((plot, i) => plot !== flowerbed[i]).length,
			);
		}
	}
	return most;
};

describe("605. Can Place Flowers", () => {
	it("solves the examples from the problem statement", () => {
		expect(canPlaceFlowers([1, 0, 0, 0, 1], 1)).toBeTrue();
		expect(canPlaceFlowers([1, 0, 0, 0, 1], 2)).toBeFalse();
	});

	it("always allows planting nothing", () => {
		expect(canPlaceFlowers([1, 0, 1], 0)).toBeTrue();
	});

	it("matches trying every set of plots on random flowerbeds", () => {
		const random = createRandom(605);
		for (let run = 0; run < 500; run++) {
			const flowerbed: number[] = [];
			for (let i = random.int(1, 10); i > 0; i--)
				flowerbed.push(
					flowerbed.at(-1) === 1 ? 0 : random.int(0, 2) === 0 ? 1 : 0,
				);
			const most = mostFlowers(flowerbed);
			expect(canPlaceFlowers(flowerbed, most)).toBeTrue();
			expect(canPlaceFlowers(flowerbed, most + 1)).toBeFalse();
		}
	});
});
