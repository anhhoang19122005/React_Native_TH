function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time);
    });
}

const task1 = simulateTask(1000);
const task2 = simulateTask(2000);
const task3 = simulateTask(3000);

Promise.all([task1, task2, task3])
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error);
    });