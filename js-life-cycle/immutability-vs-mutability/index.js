const { deepStrictEqual } = require("node:assert");

/**
 * Ao rodar o pós-incremento do "counter2", o "counter" se manterá em 0
 * e o counter2 irá para 1 dado que o valor de counter foi copiado para
 * counter2 de forma que um não depende mais do outro
 *
 * Saída:
 *   counter -> 0
 *   counter2 -> 1
 *
 * O tipo primitivo gera uma cópia em memória
 */
let counter = 0;
let counter2 = counter;

counter2++;

deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

/**
 * Nesse caso ao rodar o pós-incremento no item2.counter, o item.counter tmb
 * é atualizado pois os tipos primitivos (primeiro caso) recebem um tratamento
 * diferente de tipo de referencia como é nesse caso
 *
 * Saída:
 *   item.counter -> 1
 *   item2.counter -> 1
 *
 * O tipo de referencia copia o endereço de memória
 * e aponta para o mesmo lugar
 *
 * Nota: Uma forma de evitar um problema com isso é utilizar o Object.create()
 *       dessa forma dizemos para o JS copiar o valor e não apenas a referencia
 *       do endereço de memória
 */
const item = { counter: 0 };
const item2 = item;

item2.counter++;
deepStrictEqual(item, { counter: 1 });

item.counter++;
deepStrictEqual(item2, { counter: 2 });
