const numbers: number[] = [1,2,3,4,5,6,7,8,9,10];
Promise.resolve().then(() => {

        const result = numbers.filter((value) => value % 2 === 0)
        console.log(result);

}).finally(() => {
    console.log("Done")
});
