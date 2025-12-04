export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type Merge<
  TData extends ReadonlyArray<object | undefined> | Array<object | undefined>,
  TResult = {},
> = TData extends [
  infer CurrentObject,
  ...infer Rest extends ReadonlyArray<object | undefined> | Array<object | undefined>,
]
  ? Merge<Rest, TResult & CurrentObject>
  : TResult
