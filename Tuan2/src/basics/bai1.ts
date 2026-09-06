const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000)
})

promise.then((result) => {
    console.log(result);
});