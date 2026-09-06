function simulateTask(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${name} done after ${time} ms`), time);
    });
}

async function main() {
    const tasks = [
        simulateTask("Task 1", 1000),
        simulateTask("Task 2", 300),
        simulateTask("Task 3", 600),
    ];

    for await (const result of tasks) {
        console.log(result);
    }
}

main().catch((error: unknown) => {
    console.error(error);
});
