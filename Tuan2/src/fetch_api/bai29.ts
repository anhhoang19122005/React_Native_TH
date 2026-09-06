function processTask(taskNumber: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${taskNumber} completed`);
        }, 500);
    });
}

async function queueProcess(): Promise<void> {
    const taskQueue = [1, 2, 3, 4, 5];

    for (const taskNumber of taskQueue) {
        const result = await processTask(taskNumber);
        console.log(result);
    }
}

queueProcess().catch((error: unknown) => {
    console.error(error);
});
