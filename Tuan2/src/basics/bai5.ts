function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

let time:number = 2000;
simulateTask(time).then((result) => {
    console.log(result + " after " + (time / 1000) + " seconds");
})