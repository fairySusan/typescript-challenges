interface People {
  name: string;
  age: number;
  address:string;
  sex:0 | 1;
  skinColor: string;
}
/* 1.Pick, pick出一些属性组成新的类型*/
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type XiaoPick = MyPick<People, 'name' | 'age'>

const commonPerson:XiaoPick = {
  name: 'xiaoming',
  age:29
}

/* 2.Readonly, 把每个属性都变成readonly */
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type ReadonlyPeople = MyReadonly<XiaoPick>

const readonlyPerson: ReadonlyPeople = {
  name: 'xiaoming',
  age: 23
}
// readonlyPerson.age = 123 //Error
// readonlyPerson.name = 'xiaohong' // Error

/* 3. Tuple to Object, 把数组变量变成对象类型, T[number]用于数组转联合类型*/
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type result = TupleToObject<typeof tuple>

/* 4. First of Array, 
1.得到数组的第一个元素的类型
2.如果是一个空数组，获取的结果应该是never：extends 的逻辑判断
 */
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
type arr1 = ['a', 'b', 'c'];

type head1 = First<arr1> // expected to be 'a'

/* 5. Last of Array, 得到数组的最后一个元素的类型*/
type Last<T extends any[]> = T extends [...infer Rest, infer L] ? L : never
type last1 = Last<arr1> // expected to be 'c'


/* 6. 得到元组的长度*/
type Length<T extends any[]> = T['length']
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type teslaLength = Length<tesla> // expected 4

/* 7. 从类型T里剔除U的类型*/
type MyExclude<T, U> = T extends U ? never : T
type excludeResult = MyExclude<string | number | boolean, string> 

/* 8. 从类型T里剔除掉一些属性 */
type deleteResult = Pick<People, Exclude<keyof People, 'name' | 'age'>>

/* 9. 从Promise<ExampleType>里解构出来ExampleType; 这里有递归的概念 */
type MyAwaited<T> = T extends Promise<infer P> ? MyAwaited<P> : T

type promiseType = MyAwaited<Promise<string>>