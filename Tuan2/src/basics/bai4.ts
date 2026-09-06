function handleRandomNumber(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        const randomNumber = Math.random();

        if (randomNumber >= 0.5) {
            resolve(randomNumber);
        } else {
            reject(new Error("Something went wrong with " + randomNumber));
        }

    })

}

handleRandomNumber().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err.message)
});
