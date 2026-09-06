function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task finished after ${time} ms`);
        }, time);
    });
}

const task1 = simulateTask(3000);
const task2 = simulateTask(1000);
const task3 = simulateTask(2000);

Promise.race([task1, task2, task3])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });