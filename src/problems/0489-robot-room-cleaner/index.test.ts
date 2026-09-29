import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { robotRoomCleaner } from ".";

/** A robot in a room of 1s (open) and 0s (walls), recording what it cleans. */
const createRobot = (room: number[][], row: number, col: number) => {
	const cleaned = new Set<string>();
	const directions = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];
	let facing = 0;
	return {
		cleaned,
		robot: {
			move: () => {
				const [dr = 0, dc = 0] = directions[facing] ?? [];
				if (room[row + dr]?.[col + dc] !== 1) return false;
				row += dr;
				col += dc;
				return true;
			},
			turnLeft: () => {
				facing = (facing + 3) % 4;
			},
			turnRight: () => {
				facing = (facing + 1) % 4;
			},
			clean: () => {
				cleaned.add(`${row},${col}`);
			},
		},
	};
};

/** The open cells reachable from (row, col). */
const reachable = (room: number[][], row: number, col: number): Set<string> => {
	const found = new Set([`${row},${col}`]);
	const queue = [[row, col]];
	for (const [r = 0, c = 0] of queue) {
		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			const key = `${r + dr},${c + dc}`;
			if (room[r + dr]?.[c + dc] === 1 && !found.has(key)) {
				found.add(key);
				queue.push([r + dr, c + dc]);
			}
		}
	}
	return found;
};

describe("489. Robot Room Cleaner", () => {
	it("solves the examples from the problem statement", () => {
		const room = [
			[1, 1, 1, 1, 1, 0, 1, 1],
			[1, 1, 1, 1, 1, 0, 1, 1],
			[1, 0, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 1, 1],
		];
		const { robot, cleaned } = createRobot(room, 1, 3);
		robotRoomCleaner(robot);
		expect(cleaned).toEqual(reachable(room, 1, 3));

		const single = createRobot([[1]], 0, 0);
		robotRoomCleaner(single.robot);
		expect(single.cleaned).toEqual(new Set(["0,0"]));
	});

	it("cleans every reachable cell of random rooms", () => {
		const random = createRandom(489);
		for (let run = 0; run < 300; run++) {
			const room = Array.from({ length: random.int(1, 8) }, () =>
				random.array(8, 0, 3).map((cell) => (cell > 0 ? 1 : 0)),
			);
			const row = random.int(0, room.length - 1);
			const col = random.int(0, 7);
			const start = room[row];
			if (start) start[col] = 1;
			const { robot, cleaned } = createRobot(room, row, col);
			robotRoomCleaner(robot);
			expect(cleaned).toEqual(reachable(room, row, col));
		}
	});

	it("cleans a large open room without overflowing the stack", () => {
		const room = Array.from({ length: 100 }, () =>
			new Array<number>(200).fill(1),
		);
		const { robot, cleaned } = createRobot(room, 50, 100);
		robotRoomCleaner(robot);
		expect(cleaned.size).toBe(20_000);
	});
});
