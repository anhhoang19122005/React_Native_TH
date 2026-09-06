const promise = new Promise<never>((resolve,reject) => {
    setTimeout(() =>{
        reject(new Error("Something went wrong"));
    }, 1000)
});

promise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error.message);
});