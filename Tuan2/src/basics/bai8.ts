Promise.resolve(2).then((number) => number ** 2)
.then(number => number * 2).then(number => number + 5)
.then((number) => {
    console.log(number);
})