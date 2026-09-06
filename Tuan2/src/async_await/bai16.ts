function simulateTask(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${name} done after ${time} ms`), time);
    });
}

async function main() {
    const tasks = [
        simulateTask("Task 1", 1000),
        simulateTask("Task 2", 2000),
        simulateTask("Task 3", 1500),
    ];

    const results = await Promise.all(tasks);
    results.forEach((result) => console.log(result));
}

main().catch((error: unknown) => {
    console.error(error);
});
