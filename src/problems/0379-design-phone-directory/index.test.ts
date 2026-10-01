import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignPhoneDirectory } from ".";

describe("379. Design Phone Directory", () => {
	it("solves the example from the problem statement", () => {
		const directory = new DesignPhoneDirectory(3);
		const first = directory.get();
		const second = directory.get();
		const third = directory.get();
		expect(new Set([first, second, third])).toEqual(new Set([0, 1, 2]));
		expect(directory.get()).toBe(-1);
		expect(directory.check(2)).toBeFalse();
		directory.release(2);
		expect(directory.check(2)).toBeTrue();
	});

	it("never hands out a number twice, even when released twice", () => {
		const directory = new DesignPhoneDirectory(2);
		const number = directory.get();
		directory.release(number);
		directory.release(number);
		expect(new Set([directory.get(), directory.get()])).toEqual(
			new Set([0, 1]),
		);
		expect(directory.get()).toBe(-1);
	});

	it("matches a set of free numbers on random operations", () => {
		const random = createRandom(379);
		for (let run = 0; run < 200; run++) {
			const max = random.int(1, 6);
			const directory = new DesignPhoneDirectory(max);
			const free = new Set(Array.from({ length: max }, (_, i) => i));
			for (let step = 0; step < 40; step++) {
				const action = random.int(0, 2);
				const number = random.int(0, max - 1);
				if (action === 0) {
					const got = directory.get();
					if (free.size === 0) expect(got).toBe(-1);
					else {
						expect(free.has(got)).toBeTrue();
						free.delete(got);
					}
				} else if (action === 1) {
					expect(directory.check(number)).toBe(free.has(number));
				} else {
					directory.release(number);
					free.add(number);
				}
			}
		}
	});
});
