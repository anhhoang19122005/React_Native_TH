async function fetchWithRetry<T>(url: string, retries: number): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return (await response.json()) as T;
        } catch (error: unknown) {
            lastError = error;

            if (attempt < retries) {
                console.log(`Attempt ${attempt + 1} failed. Retrying...`);
            }
        }
    }

    throw lastError instanceof Error ? lastError : new Error("Request failed");
}

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 2)
    .then((data) => console.log(data))
    .catch((error: unknown) => {
        console.error(error instanceof Error ? error.message : error);
    });
