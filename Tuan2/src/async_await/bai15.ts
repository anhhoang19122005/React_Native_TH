function simulateTask(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} done`);
        }, time);
    });
}

async function main() {
    const result1 = await simulateTask("Task 1", 1000);
    console.log(result1);

    const result2 = await simulateTask("Task 2", 1000);
    console.log(result2);

    const result3 = await simulateTask("Task 3", 1000);
    console.log(result3);
}

main();