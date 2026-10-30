import { Heap } from "../../internal/heap";

/**
 * 2254. Design Video Sharing Platform
 *
 * Videos get the smallest free ID on upload (IDs of removed videos are
 * reused). Supports removing, watching a range of a video's minutes,
 * liking, disliking, and reading likes, dislikes and views.
 *
 * Keep videos and their stats by ID, with a min-heap of freed IDs.
 *
 * @see https://leetcode.com/problems/design-video-sharing-platform/
 * @difficulty Hard
 * @timeComplexity O(log n) per upload or removal, O(1) otherwise (plus the watched slice)
 * @spaceComplexity O(total video length)
 *
 * @example
 * const platform = new DesignVideoSharingPlatform();
 * platform.upload("123"); // 0
 * platform.watch(0, 0, 1); // "12"
 */
export class DesignVideoSharingPlatform {
	readonly #videos = new Map<
		number,
		{ video: string; views: number; likes: number; dislikes: number }
	>();
	readonly #freed = new Heap<number>((a, b) => a - b);
	#nextId = 0;

	upload(video: string): number {
		const id = this.#freed.pop() ?? this.#nextId++;
		this.#videos.set(id, { video, views: 0, likes: 0, dislikes: 0 });
		return id;
	}

	remove(videoId: number): void {
		if (this.#videos.delete(videoId)) this.#freed.push(videoId);
	}

	watch(videoId: number, startMinute: number, endMinute: number): string {
		const entry = this.#videos.get(videoId);
		if (!entry) return "-1";
		entry.views++;
		return entry.video.slice(startMinute, endMinute + 1);
	}

	like(videoId: number): void {
		const entry = this.#videos.get(videoId);
		if (entry) entry.likes++;
	}

	dislike(videoId: number): void {
		const entry = this.#videos.get(videoId);
		if (entry) entry.dislikes++;
	}

	getLikesAndDislikes(videoId: number): number[] {
		const entry = this.#videos.get(videoId);
		return entry ? [entry.likes, entry.dislikes] : [-1];
	}

	getViews(videoId: number): number {
		return this.#videos.get(videoId)?.views ?? -1;
	}
}
