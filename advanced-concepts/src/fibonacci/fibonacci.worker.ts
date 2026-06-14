
function fib(n: number) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

const fibonacci = (n: number) => {
  return fib(n);
};
module.exports = fibonacci;
