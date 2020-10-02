let sum = 0;

for (const n of process.argv) {
  if (process.argv.indexOf(n) > 1) {
    sum += +n;
  }
}

console.log(sum);
