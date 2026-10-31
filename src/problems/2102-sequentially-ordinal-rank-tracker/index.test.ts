import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { SequentiallyOrdinalRankTracker as SORTracker } from ".";

describe("2102. Sequentially Ordinal Rank Tracker", () => {
	it("solves the example from the problem statement", () => {
		const tracker = new SORTracker();
		tracker.add("bradford", 2);
		tracker.add("branford", 3);
		expect(tracker.get()).toBe("branford");
		tracker.add("alps", 2);
		expect(tracker.get()).toBe("alps");
		tracker.add("orland", 2);
		expect(tracker.get()).toBe("bradford");
		tracker.add("orlando", 3);
		expect(tracker.get()).toBe("bradford");
		tracker.add("alpine", 2);
		expect(tracker.get()).toBe("bradford");
		expect(tracker.get()).toBe("orland");
	});

	it("matches sorting all locations on random operations", () => {
		const random = createRandom(2102);
		const tracker = new SORTracker();
		const locations: [string, number][] = [];
		let gets = 0;
		for (let op = 0; op < 300; op++) {
			if (gets < locations.length && random.int(0, 1)) {
				const sorted = locations.toSorted(
					(a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1),
				);
				expect(tracker.get()).toBe(sorted[gets++]?.[0] ?? "");
			} else {
				const location: [string, number] = [
					`${random.string(4, "abc")}${op}`,
					random.int(1, 5),
				];
				locations.push(location);
				tracker.add(...location);
			}
		}
	});
});
