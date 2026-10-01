import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignSkiplist as Skiplist } from ".";

describe("1206. Design Skiplist", () => {
	it("solves the example from the problem statement", () => {
		const skiplist = new Skiplist();
		skiplist.add(1);
		skiplist.add(2);
		skiplist.add(3);
		expect(skiplist.search(0)).toBeFalse();
		skiplist.add(4);
		expect(skiplist.search(1)).toBeTrue();
		expect(skiplist.erase(0)).toBeFalse();
		expect(skiplist.erase(1)).toBeTrue();
		expect(skiplist.search(1)).toBeFalse();
	});

	it("keeps duplicates until every copy is erased", () => {
		const skiplist = new Skiplist(createRandom(1).next);
		skiplist.add(5);
		skiplist.add(5);
		expect(skiplist.erase(5)).toBeTrue();
		expect(skiplist.search(5)).toBeTrue();
		expect(skiplist.erase(5)).toBeTrue();
		expect(skiplist.search(5)).toBeFalse();
		expect(skiplist.erase(5)).toBeFalse();
	});

	it("handles 50,000 operations quickly", () => {
		const random = createRandom(12060);
		const skiplist = new Skiplist(random.next);
		for (let i = 0; i < 25000; i++) skiplist.add(random.int(0, 20000));
		for (let i = 0; i < 25000; i++) skiplist.search(random.int(0, 20000));
		expect(skiplist.search(20001)).toBeFalse();
	});

	it("matches a counting map on random operations", () => {
		const random = createRandom(1206);
		for (let run = 0; run < 100; run++) {
			const skiplist = new Skiplist(random.next);
			const counts = new Map<number, number>();
			for (let op = 0; op < 100; op++) {
				const value = random.int(0, 10);
				const kind = random.int(0, 2);
				if (kind === 0) {
					skiplist.add(value);
					counts.set(value, (counts.get(value) ?? 0) + 1);
				} else if (kind === 1) {
					expect(skiplist.search(value)).toBe((counts.get(value) ?? 0) > 0);
				} else {
					const present = (counts.get(value) ?? 0) > 0;
					expect(skiplist.erase(value)).toBe(present);
					if (present) counts.set(value, (counts.get(value) ?? 0) - 1);
				}
			}
		}
	});
});
