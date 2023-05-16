import {
	useRef,
	useCallback,
	createContext,
	type ReactNode,
	useSyncExternalStore,
	useContext,
} from "react";

class Stack<T> {
	private stack: T[];
	constructor() {
		this.stack = [];
	}
	push(item: T) {
		this.stack.push(item);
	}
	pop() {
		this.stack.pop();
	}
	isEmpty() {
		return this.stack.length === 0;
	}
	get() {
		return this.stack;
	}
}
export const fastContext = <T,>(intialState: T[]) => {
	function useStoreData(): {
		getStack: () => T[];
		set: (value: T) => void;
		subscribe: (callback: () => void) => () => void;
	} {
		const stack = useRef(new Stack<T>());
		const getStack = useCallback(() => stack.current.get(), []);
		const set = useCallback((value: T) => {
			stack.current.push(value);
		}, []);
		const subscribe = useCallback((callback: () => void) => {
			subscribers.current.add(callback);
			return () => subscribers.current.delete(callback);
		}, []);
		const subscribers = useRef(new Set<() => void>());
		return {
			getStack,
			set,
			subscribe,
		};
	}
	type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

	const StoreContext = createContext<UseStoreDataReturnType | null>(null);

	function Provider({ children }: { children: ReactNode }) {
		return (
			<StoreContext.Provider value={useStoreData()}>
				{children}
			</StoreContext.Provider>
		);
	}

	function useStore(selector: (store: T) => T[]): [T[], (value: T) => void] {
		const store = useContext(StoreContext);
		if (!store) {
			throw new Error("Store not found");
		}

		const state = useSyncExternalStore(store.subscribe, () =>
			selector(store.getStack() as T)
		);

		return [state, store.set];
	}

	return {
		Provider,
		useStore,
	};
};
