function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time);
    });
}

async function callSimulateTask() {
    const result = await simulateTask(2000);
    console.log(result);
}

callSimulateTask();