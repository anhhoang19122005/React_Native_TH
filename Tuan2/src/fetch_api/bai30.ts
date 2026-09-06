interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodo(url: string): Promise<Todo> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as Todo;
}

async function main() {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/invalid-url",
    ];

    const results = await Promise.allSettled(urls.map((url) => fetchTodo(url)));

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Request ${index + 1}: success`, result.value);
        } else {
            console.error(`Request ${index + 1}: failure`, result.reason);
        }
    });
}

main().catch((error: unknown) => {
    console.error(error);
});
