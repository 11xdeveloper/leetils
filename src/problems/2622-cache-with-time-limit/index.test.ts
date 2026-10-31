import { describe, expect, it } from "bun:test";
import { CacheWithTimeLimit } from ".";

describe("2622. Cache With Time Limit", () => {
	it("solves the examples from the problem statement", () => {
		let time = 0;
		const cache = new CacheWithTimeLimit(() => time);
		expect(cache.set(1, 42, 100)).toBeFalse();
		time = 50;
		expect(cache.get(1)).toBe(42);
		expect(cache.count()).toBe(1);
		time = 150;
		expect(cache.get(1)).toBe(-1);

		time = 0;
		const other = new CacheWithTimeLimit(() => time);
		expect(other.set(1, 42, 50)).toBeFalse();
		time = 40;
		expect(other.set(1, 50, 100)).toBeTrue();
		time = 50;
		expect(other.get(1)).toBe(50);
		time = 120;
		expect(other.get(1)).toBe(50);
		time = 200;
		expect(other.get(1)).toBe(-1);
		time = 250;
		expect(other.count()).toBe(0);
	});

	it("doesn't count an expired entry as overwritten", () => {
		let time = 0;
		const cache = new CacheWithTimeLimit(() => time);
		cache.set(1, 1, 10);
		cache.set(2, 2, 30);
		time = 10;
		expect(cache.count()).toBe(1);
		expect(cache.set(1, 3, 10)).toBeFalse();
		expect(cache.count()).toBe(2);
	});
});
