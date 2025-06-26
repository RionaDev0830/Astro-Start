// store.ts
import { atom, useAtom } from "jotai";

export const isOpenAtom = atom(false);
export const openBtn = atom(false);

export { useAtom };
