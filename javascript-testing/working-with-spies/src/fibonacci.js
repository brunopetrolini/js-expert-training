class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    }

    yield current; // retorna o valor sob demanda

    yield* this.execute(input - 1, next, current + next); // delega a função mas não retorna valor
  }
}

module.exports = Fibonacci;
