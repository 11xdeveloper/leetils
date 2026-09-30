import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignAFileSharingSystem as FileSharing } from ".";

describe("1500. Design a File Sharing System", () => {
	it("solves the example from the problem statement", () => {
		const sharing = new FileSharing(4);
		expect(sharing.join([1, 2])).toBe(1);
		expect(sharing.join([2, 3])).toBe(2);
		expect(sharing.join([4])).toBe(3);
		expect(sharing.request(1, 3)).toEqual([2]);
		expect(sharing.request(2, 2)).toEqual([1, 2]);
		sharing.leave(1);
		expect(sharing.request(2, 1)).toEqual([]);
		sharing.leave(2);
		expect(sharing.join([])).toBe(1);
	});

	it("matches a list of users on random operations", () => {
		const random = createRandom(1500);
		for (let run = 0; run < 50; run++) {
			const sharing = new FileSharing(5);
			const users = new Map<number, Set<number>>();
			for (let op = 0; op < 40; op++) {
				const kind = random.int(0, 2);
				if (kind === 0 || users.size === 0) {
					const chunks = [...new Set(random.array(random.int(0, 3), 1, 5))];
					let id = 1;
					while (users.has(id)) id++;
					expect(sharing.join(chunks)).toBe(id);
					users.set(id, new Set(chunks));
				} else {
					const ids = [...users.keys()];
					const user = ids[random.int(0, ids.length - 1)] ?? 1;
					if (kind === 1) {
						sharing.leave(user);
						users.delete(user);
					} else {
						const chunk = random.int(1, 5);
						const owners = ids
							.filter((id) => users.get(id)?.has(chunk))
							.sort((a, b) => a - b);
						expect(sharing.request(user, chunk)).toEqual(owners);
						if (owners.length > 0) users.get(user)?.add(chunk);
					}
				}
			}
		}
	});
});
