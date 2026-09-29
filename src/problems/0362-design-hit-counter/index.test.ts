import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignHitCounter } from ".";

describe("362. Design Hit Counter", () => {
	it("solves the example from the problem statement", () => {
		const counter = new DesignHitCounter();
		counter.hit(1);
		counter.hit(2);
		counter.hit(3);
		expect(counter.getHits(4)).toBe(3);
		counter.hit(300);
		expect(counter.getHits(300)).toBe(4);
		expect(counter.getHits(301)).toBe(3);
	});

	it("matches counting a list of every hit on random streams", () => {
		const random = createRandom(362);
		for (let run = 0; run < 200; run++) {
			const counter = new DesignHitCounter();
			const hits: number[] = [];
			let timestamp = 1;
			for (let step = 0; step < 60; step++) {
				timestamp += random.int(0, 1) === 0 ? 0 : random.int(1, 120);
				if (random.int(0, 1) === 0) {
					counter.hit(timestamp);
					hits.push(timestamp);
				} else {
					expect(counter.getHits(timestamp)).toBe(
						hits.filter((t) => t > timestamp - 300).length,
					);
				}
			}
		}
	});
});
