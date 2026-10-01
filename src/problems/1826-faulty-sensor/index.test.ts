import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { faultySensor as badSensor } from ".";

describe("1826. Faulty Sensor", () => {
	it("solves the examples from the problem statement", () => {
		expect(badSensor([2, 3, 4, 5], [2, 1, 3, 4])).toBe(1);
		expect(badSensor([2, 2, 2, 2, 2], [2, 2, 2, 2, 5])).toBe(-1);
		expect(badSensor([2, 3, 2, 2, 3, 2], [2, 3, 2, 3, 2, 7])).toBe(2);
	});

	it("never blames the working sensor on randomly generated readings", () => {
		const random = createRandom(1826);
		for (let run = 0; run < 300; run++) {
			const data = random.array(random.int(1, 8), 1, 3);
			const dropped = random.int(0, data.length - 1);
			let filler = random.int(1, 4);
			if (filler === data[dropped]) filler = 4;
			const broken = [
				...data.slice(0, dropped),
				...data.slice(dropped + 1),
				filler,
			];
			const faulty = random.int(1, 2);
			const result =
				faulty === 1 ? badSensor(broken, data) : badSensor(data, broken);
			expect([faulty, -1]).toContain(result);
		}
	});
});
