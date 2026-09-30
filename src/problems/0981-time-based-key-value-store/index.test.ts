import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { TimeBasedKeyValueStore as TimeMap } from ".";

describe("981. Time Based Key-Value Store", () => {
	it("solves the example from the problem statement", () => {
		const store = new TimeMap();
		store.set("foo", "bar", 1);
		expect(store.get("foo", 1)).toBe("bar");
		expect(store.get("foo", 3)).toBe("bar");
		store.set("foo", "bar2", 4);
		expect(store.get("foo", 4)).toBe("bar2");
		expect(store.get("foo", 5)).toBe("bar2");
	});

	it("matches scanning every entry on random operations", () => {
		const random = createRandom(981);
		for (let run = 0; run < 100; run++) {
			const store = new TimeMap();
			const entries: [string, string, number][] = [];
			let time = 0;
			for (let op = 0; op < 50; op++) {
				const key = random.string(1, "ab");
				if (random.int(0, 1)) {
					time += random.int(1, 3);
					const value = random.string(3, "xyz");
					store.set(key, value, time);
					entries.push([key, value, time]);
				} else {
					const t = random.int(0, time + 2);
					const match = entries
						.filter(([k, , at]) => k === key && at <= t)
						.at(-1);
					expect(store.get(key, t)).toBe(match?.[1] ?? "");
				}
			}
		}
	});
});
