/**
 * Algumas coisas bizarras que acontecem no JS por conta da coersão de tipos :)
 */

9999999999999999; // 16 caracteres 9
// Saída -> 10000000000000000

true + 2;
// Saída -> 3

"21" + true;
// Saída -> '21true'

"21" - true;
// Saída -> 20

"21" - -1;
// Saída -> 22

0.1 + 0.2 === 0.3;
// Saída -> false (isso pq o resultado de 0.1 + 0.2 é 0.30000000000000004)

3 > 2 > 1;
// Saída -> false

3 > 2 >= 1;
// Saída -> true

"B" + "a" + +"a" + "a"; // Só por diversão :)
// Saída -> 'BaNaNa'

/**
 * Por conta dos exemplos mostrados acima, é extremamente importante evitarmos o
 * uso do loose equality operator (==) e utilizarmos o strict equality operator (===)
 * por com o strict a coersão de tipos não é realizado por debaixo dos panos pelo JS
 */

"1" == 1; // Usando o loose equality operator
// Saída -> true

"1" === 1; // Usando o strict equality operator
// Saída -> false

// ---------------------------------------------------------------------------------
/**
 * Conseguimos fazer a conversão de explicita de tipos por meio de seus construtores
 */

console.assert(String(123) === "123", "explicit conversion to string");
console.assert(123 + "" === "123", "implicit conversion to string");

console.assert(("hello" || 123) === "hello", "|| returns the first element if both is true");
console.assert(("hello" && 123) === 123, "&& returns the last element if both is true");

// ---------------------------------------------------------------------------------

const item = {
  name: "Bruno Petrolini",
  age: 26,
  // Se for string é chamado primeiro, se não chama valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // Se for number é chamado primeiro, se não chama toString
  valueOf() {
    return { hey: "dude" };
  },
  // Esse cara manda tem prioridade em tudo
  [Symbol.toPrimitive](coercionType) {
    console.log("Trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "007",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item));
// console.log("valueOf", Number(item)); // Retorna NaN pois o toString retornou uma string

// Depois de adicionar o toPrimitive
console.log("String", String(item));
console.log("Number", Number(item));
// Chama a conversão default
console.log("Date", new Date(item));
