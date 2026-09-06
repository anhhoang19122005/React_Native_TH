const numbers: number[] = [1,2,3,4,5,6,7,8,9,10];
Promise.resolve().then(() => {
    setTimeout(() => {
        const result = numbers.filter((value) => value % 2 === 0)
        console.log(result);
    }, 1000)
});
