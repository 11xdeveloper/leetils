import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RangeModule } from ".";

describe("715. Range Module", () => {
	it("solves the example from the problem statement", () => {
		const module = new RangeModule();
		module.addRange(10, 20);
		module.removeRange(14, 16);
		expect(module.queryRange(10, 14)).toBeTrue();
		expect(module.queryRange(13, 15)).toBeFalse();
		expect(module.queryRange(16, 17)).toBeTrue();
	});

	it("merges touching ranges", () => {
		const module = new RangeModule();
		module.addRange(1, 5);
		module.addRange(5, 9);
		expect(module.queryRange(2, 8)).toBeTrue();
	});

	it("matches tracking every unit interval on random operations", () => {
		const random = createRandom(715);
		for (let run = 0; run < 100; run++) {
			const module = new RangeModule();
			// covered[x] means [x, x + 1) is covered; integer endpoints make that exact.
			const covered = new Array<boolean>(30).fill(false);
			for (let op = 0; op < 50; op++) {
				const left = random.int(0, 28);
				const right = random.int(left + 1, 29);
				const action = random.int(0, 2);
				if (action === 0) {
					module.addRange(left, right);
					covered.fill(true, left, right);
				} else if (action === 1) {
					module.removeRange(left, right);
					covered.fill(false, left, right);
				} else {
					expect(module.queryRange(left, right)).toBe(
						covered.slice(left, right).every(Boolean),
					);
				}
			}
		}
	});
});
