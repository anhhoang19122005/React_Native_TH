function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

async function callSimulateTask() {
    try {
        const result = await simulateTask(2000);
        console.log(result);
    } catch(err) {
        console.error(err);
    }
}

callSimulateTask();