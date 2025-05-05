import { ListNode } from "./ListNode";

export const listNodeFromArray = (arr: number[]): ListNode | null => {
	if (arr.length === 0) return null;

	return new ListNode(arr[0], listNodeFromArray(arr.slice(1)));
};
