namespace Hard {
  /*元组转枚举对象 */
  type TupleToEumn<T extends any[], B = false> = B extends true ? {
    readonly [P in T[number]]: P
  } : {
    readonly [P in T[number]]: P
  }

  type enumResult = TupleToEumn<['china', 'american', 'jenpanese'], true>
}