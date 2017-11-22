const numbersArray = [ 1, 2, 3, 4, 5 ];

function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}

function print(param) {
  console.log(`print(${param})`);
}

const tasks = numbersArray.map((number, i) => {
  return () => {
    return delay(1000)
      .then(() => delay(1000))
      .then(() => print(number));
  }
});

let taskAccumulator = tasks[0]();

for (let i = 1; i < tasks.length; i++) {
  taskAccumulator = taskAccumulator.then(tasks[i]);
}

taskAccumulator.then((result) => {
  console.log('result:', result);
})
