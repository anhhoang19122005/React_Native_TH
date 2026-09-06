function processTask(taskNumber: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${taskNumber} completed`);
        }, 500 + taskNumber * 100);
    });
}

async function batchProcess(): Promise<void> {
    const tasks = [1, 2, 3, 4, 5].map((taskNumber) => processTask(taskNumber));
    const results = await Promise.all(tasks);
    results.forEach((result) => console.log(result));
}

batchProcess().catch((error: unknown) => {
    console.error(error);
});
