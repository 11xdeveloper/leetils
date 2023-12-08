import { ListNode } from '../..';

export default (lists: Array<ListNode>) =>
    lists.length === 0
        ? null
        : ListNode.from(lists.flatMap((list) => list.toArray()));
