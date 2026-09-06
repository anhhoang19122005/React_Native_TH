interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodo(id: number): Promise<Todo> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (!response.ok) {
        throw new Error(`Request for todo ${id} failed with status ${response.status}`);
    }

    return (await response.json()) as Todo;
}

async function main() {
    const todos = await Promise.all([1, 2, 3].map((id) => fetchTodo(id)));
    todos.forEach((todo) => console.log(todo));
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
});
