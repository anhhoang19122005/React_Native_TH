const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 1000);
});

promise.then((result) => {
    console.log(result);
});