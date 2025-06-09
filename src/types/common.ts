
// Nullable type
export type Nullable<T> = T | null;

// Optional type (alias for undefined)
export type Optional<T> = T | undefined;

// Maybe type (null or undefined)
export type Maybe<T> = T | null | undefined;

// DeepPartial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ValueOf type
export type ValueOf<T> = T[keyof T];

// Primitive types
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

// Empty object type
export type EmptyObject = Record<string, never>;
