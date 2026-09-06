interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function main() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const todo = (await response.json()) as Todo;
    console.log(todo);
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
});
