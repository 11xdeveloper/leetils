import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { FindingMkAverage as MKAverage } from ".";

describe("1825. Finding MK Average", () => {
	it("solves the example from the problem statement", () => {
		const stream = new MKAverage(3, 1);
		stream.addElement(3);
		stream.addElement(1);
		expect(stream.calculateMKAverage()).toBe(-1);
		stream.addElement(10);
		expect(stream.calculateMKAverage()).toBe(3);
		stream.addElement(5);
		stream.addElement(5);
		stream.addElement(5);
		expect(stream.calculateMKAverage()).toBe(5);
	});

	it("matches sorting the window on random streams", () => {
		const random = createRandom(1825);
		for (let run = 0; run < 30; run++) {
			const k = random.int(1, 3);
			const m = random.int(2 * k + 1, 10);
			const stream = new MKAverage(m, k);
			const values: number[] = [];
			for (let op = 0; op < 200; op++) {
				if (random.int(0, 1) === 0) {
					const num = random.int(1, 100000);
					stream.addElement(num);
					values.push(num);
					continue;
				}
				const window = values.slice(-m).sort((a, b) => a - b);
				const expected =
					window.length < m
						? -1
						: Math.floor(
								window.slice(k, m - k).reduce((s, v) => s + v, 0) / (m - 2 * k),
							);
				expect(stream.calculateMKAverage()).toBe(expected);
			}
		}
	});
});
