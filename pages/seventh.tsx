import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";

const { useStore, Provider } = fastTodoContext<{ remarks: string }>([]);
const Yash = () => {
	return (
		<Provider>
			<div className='grid min-h-screen place-items-center'>
				<TodoForm />
				<TodoListComponent />
			</div>
		</Provider>
	);
};

export default Yash;

const TodoForm = () => {
	const [_, set] = useStore();
	const [item, setItem] = useState("");
	const [remark, setRemark] = useState("");
	return (
		<form
			className='bg-white mt-10 border p-2 gap-3 flex flex-col rounded-sm w-[min(92%,500px)]'
			onSubmit={(e) => {
				e.preventDefault();

				set({ title: item, data: { remarks: remark } });
		>
			<div className='flex gap-2'>
				<label htmlFor='task'>Task</label>
				<input
					name='task'
					value={item}
					className='w-full focus-visible:outline-[#33deed] focus:outline-[#33deed]'
					onChange={(e) => setItem(e.target.value)}
				/>
			</div>
			<div className='flex gap-2'>
				<label htmlFor='REMARK'>Remark</label>
				<textarea
					name='remark'
					rows={2}
					value={remark}
					onChange={(e) => setRemark(e.target.value)}
					className='w-full focus-visible:outline-[#33deed] focus:outline-[#33deed]'
				/>
			</div>
			<button className='bg-[#ff6500] p-2 rounded grayscale hover:grayscale-0 transition-all duration-300 ease-in text-white self-center'>
				submit
			</button>
		</form>
	);
};

const TodoListComponent = () => {
	const [list, _] = useStore();
	console.log(list);
	return (
		<>
			{list.map((item, index) => (
				<div key={index.toString()}>
					{item.getData()?.remarks}/{item.getTitle()}/
					{item.isCompleted() ? "completed" : "Remaining"}
				</div>
			))}
		</>
	);
};
// make a todo store and subscribe to it using the useExternalstore hook

interface TodoItem<T> {
	id?: number;
	completed?: boolean;
	title: string;
	data?: T;
}

interface TodoItem<T> {
	id?: number;
	completed?: boolean;
	title: string;
	data?: T;
}

class Todo<T> {
	private static index = 0;
	private id: number;
	private title: string;
	private data: T | undefined;
	private completed: boolean;

	constructor(item: TodoItem<T>) {
		this.id = item.id ?? Todo.index + 1;
		this.title = item.title;
		this.data = item.data;
		this.completed = item.completed ?? false;
		Todo.index++;
	}

	getId(): number {
		return this.id;
	}

	getTitle(): string {
		return this.title;
	}

	isCompleted(): boolean {
		return this.completed;
	}

	getData(): T | undefined {
		return this.data;
	}

	updateTitle(title: string): void {
		this.title = title;
	}

	toggleCompleted(): void {
		this.completed = !this.completed;
	}
}

class TodoList<T> {
	private todos: Todo<T>[];

	constructor() {
		this.todos = [];
	}

	addTodo(todo: TodoItem<T>): void {
		this.todos.push(new Todo<T>(todo));
	}

	getTodos(): Todo<T>[] {
		return this.todos;
	}

	getTodoById(id: number): Todo<T> | undefined {
		return this.todos.find((todo) => todo.getId() === id);
	}

	removeTodoById(id: number): void {
		this.todos = this.todos.filter((todo) => todo.getId() !== id);
	}

	totalItems(): number {
		return this.todos.length;
	}

	getCompleted(): Todo<T>[] {
		return this.todos.filter((item) => item.isCompleted());
	}

	getPending(): Todo<T>[] {
		return this.todos.filter((item) => !item.isCompleted());
	}
}

function fastTodoContext<T>(initialState: Todo<T>[]) {
	function useStoreTodo(): {
		get: () => Todo<T>[];
		set: (data: TodoItem<T>) => void;
		subscribe: (cb: () => void) => () => void;
	} {
		const store = useRef(new TodoList<T>());
		const get = useCallback(() => store.current.getTodos(), []);

		const subscribers = useRef(new Set<() => void>());
		const set = useCallback((data: TodoItem<T>) => {
			store.current.addTodo(data);
			subscribers.current.forEach((callback) => callback());
		}, []);
		const subscribe = useCallback((cb: () => void) => {
			subscribers.current.add(cb);
			return () => subscribers.current.delete(cb);
		}, []);
		return {
			get,
			set,
			subscribe,
		};
	}
	type UseStoreDataReturnType = ReturnType<typeof useStoreTodo>;

	const StoreContext = createContext<UseStoreDataReturnType | null>(null);


	function Provider({ children }: { children: ReactNode }) {
		return (
			<StoreContext.Provider value={useStoreTodo()}>
				{children}
			</StoreContext.Provider>
		);
	}

	function useStore(): [Todo<T>[], (data: TodoItem<T>) => void] {
		const store = useContext(StoreContext);
		if (!store) {
			throw new Error("Store not found");
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => store.get(),
			() => initialState
		);

		return [state, store.set];
	}
	return {
		Provider,
		useStore,
	};
}
