/** The interface LeetCode provides for measuring characters. */
interface FontInfo {
	getWidth(fontSize: number, ch: string): number;
	getHeight(fontSize: number): number;
}

/**
 * 1618. Maximum Font to Fit a Sentence in a Screen
 *
 * Returns the largest size in the ascending `fonts` at which `text` fits on
 * one line of a `w × h` screen, measured with `fontInfo`, or -1.
 *
 * Bigger fonts are never smaller, so binary search over `fonts`. The text's
 * width only depends on how often each letter appears, so count them once.
 *
 * @see https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen/
 * @difficulty Medium
 * @timeComplexity O(n + 26 log f) for f fonts
 * @spaceComplexity O(1)
 *
 * @example
 * maximumFontToFitASentenceInAScreen("leetcode", 1000, 50, [1, 2, 4], fontInfo); // 4
 */
export const maximumFontToFitASentenceInAScreen = (
	text: string,
	w: number,
	h: number,
	fonts: readonly number[],
	fontInfo: FontInfo,
): number => {
	const counts = new Map<string, number>();
	for (const char of text) counts.set(char, (counts.get(char) ?? 0) + 1);
	const fits = (size: number) => {
		if (fontInfo.getHeight(size) > h) return false;
		let width = 0;
		for (const [char, count] of counts)
			width += count * fontInfo.getWidth(size, char);
		return width <= w;
	};
	let [low, high] = [0, fonts.length];
	while (low < high) {
		const mid = (low + high) >>> 1;
		if (fits(fonts[mid] ?? 0)) low = mid + 1;
		else high = mid;
	}
	return fonts[low - 1] ?? -1;
};
