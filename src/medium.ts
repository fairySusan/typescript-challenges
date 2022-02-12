namespace Medium {
  /* 实现内置的ReturnType<T> */
  
  type MyReturnType<T> = T extends (...args: any) => infer R ? R : never
  
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }
  
  type a = MyReturnType<typeof fn> // should be "1 | 2"
  
  /*实现内置的omit<T, K> */

  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>
  
  type b = MyOmit<Todo, 'title' | 'description'> // should be {completed: boolean}
  
  /*把部分属性变为readonly */
  type MyReadonly<T, K extends keyof T = keyof T> = {
    [R in Exclude<keyof T, K>]: T[R];
  } & {
    readonly [P in K]: T[P]
  }

  type MyReadonlyResult = MyReadonly<Todo, 'completed'>

  /*deep的readonly */
  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type DeepReadony<T> = T extends never ? T : {
    readonly [P in keyof T]: DeepReadony<T[P]>
  }

  type DeepReadonyResult = DeepReadony<X>

  /*元组转联合类型 */
  
  type TupleToUnion<T extends any[]> = T[number]
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

 
}





