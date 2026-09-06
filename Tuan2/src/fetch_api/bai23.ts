interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

async function fetchCompletedTodos(): Promise<Todo[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const todos = (await response.json()) as Todo[];
    return todos.filter((todo) => todo.completed);
}

fetchCompletedTodos()
    .then((todos) => console.log(todos))
    .catch((error: unknown) => {
        console.error(error instanceof Error ? error.message : error);
    });
