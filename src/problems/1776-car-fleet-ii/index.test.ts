import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { carFleetII as getCollisionTimes } from ".";

/** Simulates fleets, advancing to each next collision between neighbouring fleets. */
const bySimulation = (cars: number[][]): number[] => {
	const answer = new Array<number>(cars.length).fill(-1);
	// A fleet moves at its front car's speed; a collision is the front car of the fleet behind hitting it.
	let fleets = cars.map(([position = 0, speed = 0], i) => ({
		rear: i,
		front: i,
		position,
		speed,
	}));
	let time = 0;
	for (;;) {
		let next = Infinity;
		let index = -1;
		for (let k = 0; k + 1 < fleets.length; k++) {
			const [back, ahead] = [fleets[k], fleets[k + 1]];
			if (!back || !ahead || back.speed <= ahead.speed) continue;
			const t = (ahead.position - back.position) / (back.speed - ahead.speed);
			if (t < next) [next, index] = [t, k];
		}
		if (index === -1) return answer;
		time += next;
		fleets = fleets.map((f) => ({
			...f,
			position: f.position + f.speed * next,
		}));
		const [back, ahead] = [fleets[index], fleets[index + 1]];
		if (!back || !ahead) return answer;
		answer[back.front] = time;
		fleets.splice(index, 2, {
			rear: back.rear,
			front: ahead.front,
			position: ahead.position,
			speed: ahead.speed,
		});
	}
};

describe("1776. Car Fleet II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getCollisionTimes([
				[1, 2],
				[2, 1],
				[4, 3],
				[7, 2],
			]),
		).toEqual([1, -1, 3, -1]);
		expect(
			getCollisionTimes([
				[3, 4],
				[5, 4],
				[6, 3],
				[9, 1],
			]),
		).toEqual([2, 1, 1.5, -1]);
	});

	it("matches simulating the fleets on random inputs", () => {
		const random = createRandom(1776);
		for (let run = 0; run < 300; run++) {
			const positions = [
				...new Set(random.array(random.int(1, 8), 1, 40)),
			].sort((a, b) => a - b);
			const cars = positions.map((position) => [position, random.int(1, 6)]);
			const expected = bySimulation(cars);
			const actual = getCollisionTimes(cars);
			for (const [i, time] of expected.entries())
				expect(actual[i] ?? 0).toBeCloseTo(time, 6);
		}
	});
});
