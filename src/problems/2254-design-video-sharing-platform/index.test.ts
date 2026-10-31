import { describe, expect, it } from "bun:test";
import { DesignVideoSharingPlatform as VideoSharingPlatform } from ".";

describe("2254. Design Video Sharing Platform", () => {
	it("solves the examples from the problem statement", () => {
		const platform = new VideoSharingPlatform();
		expect(platform.upload("123")).toBe(0);
		expect(platform.upload("456")).toBe(1);
		platform.remove(4);
		platform.remove(0);
		expect(platform.upload("789")).toBe(0);
		expect(platform.watch(1, 0, 5)).toBe("456");
		expect(platform.watch(1, 0, 1)).toBe("45");
		platform.like(1);
		platform.dislike(1);
		platform.dislike(1);
		expect(platform.getLikesAndDislikes(1)).toEqual([1, 2]);
		expect(platform.getViews(1)).toBe(2);

		const empty = new VideoSharingPlatform();
		empty.remove(0);
		expect(empty.watch(0, 0, 1)).toBe("-1");
		empty.like(0);
		empty.dislike(0);
		expect(empty.getLikesAndDislikes(0)).toEqual([-1]);
		expect(empty.getViews(0)).toBe(-1);
	});

	it("reuses the smallest freed ID", () => {
		const platform = new VideoSharingPlatform();
		for (const video of ["a", "b", "c"]) platform.upload(video);
		platform.remove(2);
		platform.remove(1);
		expect(platform.upload("d")).toBe(1);
		expect(platform.upload("e")).toBe(2);
		expect(platform.upload("f")).toBe(3);
	});
});
