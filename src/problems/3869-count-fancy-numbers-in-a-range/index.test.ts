import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countFancyNumbersInARange as countFancy } from ".";

const good = (x: number): boolean => {
	const d = String(x);
	let [up, down] = [true, true];
	for (let i = 1; i < d.length; i++) {
		if ((d[i] ?? "") <= (d[i - 1] ?? "")) up = false;
		if ((d[i] ?? "") >= (d[i - 1] ?? "")) down = false;
	}
	return up || down;
};

describe("3869. Count Fancy Numbers in a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countFancy(8, 10)).toBe(3);
		expect(countFancy(12340, 12341)).toBe(1);
		expect(countFancy(123456788, 123456788)).toBe(0);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(3869);
		for (let run = 0; run < 100; run++) {
			const l = random.int(1, 100000);
			const r = random.int(l, l + 2000);
			let expected = 0;
			for (let x = l; x <= r; x++)
				if (good(x) || good([...String(x)].reduce((s, d) => s + Number(d), 0)))
					expected++;
			expect(countFancy(l, r)).toBe(expected);
		}
	});
});
