import { atom } from "jotai";
import { User } from "~/global/firebaseFunctions/db";
import { getCurrentUserFromStorage } from "~/global/utils/localStorageFunctions";

const currentUserAtom = atom<User | null>(getCurrentUserFromStorage());

export { currentUserAtom };
