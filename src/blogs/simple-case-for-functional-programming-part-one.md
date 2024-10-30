---
title: "Simple Case for Functional Programming in TypeScript - Part One"
date: "2024-10-29"
category: ["JavaScript", "Typescript", "Functional Programming"]
cover: "/images/blog/functional-programming-part-1-cover.png"
thumb: "/images/blog/sm/functional-programming-part-1-thumb.png"
---

Functional programming (FP) is a paradigm that emphasizes immutability, predictable behavior, and the explicit handling of both success and error cases. Although TypeScript is often associated with object-oriented programming, it is a language well-suited to adopting functional principles, particularly when it comes to improving error handling, code clarity, and flow control.

In this article, we’ll refactor a simple URL shortener service repository interface from an imperative style that throws errors to a functional programming approach using `Result` types. We'll see how FP can bring clarity and robustness to your code.

### Imperative Error Throwing

Let's first look at a typical imperative design for a `UrlRepository` interface, where errors are thrown inside the methods. The interface looks simple, and at first glance, it seems effective:

```typescript showLineNumbers
export interface UrlRepository {
  create: (url: ShortenedUrl.Draft) => Promise<ShortenedUrl>;
  findById: (id: number) => Promise<ShortenedUrl | null>;
  getNextId: () => Promise<number>;
}

export type ShortenedUrl = {
  id: number;
  url: string;
  hash: string;
  createdAt: Date;
};

export namespace ShortenedUrl {
  export type Draft = Omit<ShortenedUrl, "createdAt">;
}
```

In this interface, the repository provides methods to create, find, and retrieve the next ID for shortened URLs. Errors are typically handled by throwing exceptions when things go wrong (e.g., duplicate URLs, missing records, etc.). Here's an example implementation using an in-memory store:

```typescript showLineNumbers {11, 27}
export class InMemoryUrlRepository implements UrlRepository {
  private store: Record<number, ShortenedUrl> = {};

  create = async (draft: ShortenedUrl.Draft): Promise<ShortenedUrl> => {
    const record = {
      ...draft,
      createdAt: new Date(),
    };

    if (this.store[record.id]) {
      throw new Error("Record already exists");
    }

    this.store[record.id] = record;

    return Promise.resolve(record);
  };

  findById = async (id: number): Promise<ShortenedUrl | null> => {
    return Promise.resolve(this.store[id] || null);
  };

  getNextId = async (): Promise<number> => {
    const nextId = Object.keys(this.store).length + 1;

    if (isNaN(nextId)) {
      throw new Error("Failed to generate next ID");
    }

    return Promise.resolve(nextId);
  };
}
```

While straightforward, this implementation lacks comprehensive error handling. Typically in a real-world application, you would need to handle various error cases, such as duplicate URLs, missing records, or database connection issues. The imperative approach can quickly become unwieldy as you add more error checks and edge cases.

### Introducing the Result Type

To address error handling more effectively, we can use a `Result` type to represent both success and error cases. The `Result` type is a common functional programming pattern that allows to explicitly handle success and error cases.

We modify `UrlRepository` interface to user a `Result` type:

```typescript showLineNumbers /Result/#v {9-19}
export interface UrlRepository {
  create: (url: ShortenedUrl.Draft) => Promise<Result<ShortenedUrl, Error>>;

  findById: (id: number) => Promise<Result<ShortenedUrl | null, Error>>;

  getNextId: () => Promise<Result<number, Error>>;
}

export type Result<T, E> = Ok<T> | Err<E>;

export type Ok<T> = {
  kind: "success";
  value: T;
};

export type Err<E> = {
  kind: "error";
  error: E;
};

export type ShortenedUrl = {
  id: number;
  url: string;
  hash: string;
  createdAt: Date;
};

export namespace ShortenedUrl {
  export type Draft = Omit<ShortenedUrl, "createdAt">;
}
```

The generic `Result` type can represent both success and error cases. The `Ok` type represents a successful result, while the `Err` type represents an error. By using the `Result` type, we can explicitly handle both success and error cases in a type-safe manner.

### Revisiting the Implementation

With the `Result` type in place, we can now refactor the `InMemoryUrlRepository` implementation to use the `Result` type for error handling:

```typescript showLineNumbers /Result/#v {16-19, 24, 26, 32, 34, 43-46, 49-52, 54}
import { ShortenedUrl, UrlRepository, Result } from "./UrlRepository";

export class InMemoryUrlRepository implements UrlRepository {
  private store: Record<number, ShortenedUrl> = {};

  create = (
    draft: ShortenedUrl.Draft
  ): Promise<Result<ShortenedUrl, Error>> => {
    try {
      const record = {
        ...draft,
        createdAt: new Date(),
      };

      if (this.store[record.id]) {
        return Promise.reject({
          kind: "error",
          error: new Error("Record already exists"),
        });
      }

      this.store[record.id] = record;

      return Promise.resolve({ kind: "success", value: record });
    } catch (error) {
      return Promise.reject({ kind: "error", error });
    }
  };

  findById = (id: number): Promise<Result<ShortenedUrl | null, Error>> => {
    try {
      return Promise.resolve({ kind: "success", value: this.store[id] });
    } catch (error) {
      return Promise.reject({ kind: "error", error });
    }
  };

  getNextId = (): Promise<Result<number, Error>> => {
    try {
      const nextId = Object.keys(this.store).length + 1;

      if (isNaN(nextId)) {
        return Promise.reject({
          kind: "error",
          error: new Error("Failed to generate next ID"),
        });
      }

      return Promise.resolve({
        kind: "success",
        value: Object.keys(this.store).length + 1,
      });
    } catch (error) {
      return Promise.reject({ kind: "error", error });
    }
  };
}
```

### Key Improvements

1. **Explicit Error Handling**: Instead of allowing function to return unpredictable results or throw exceptions, each method now returns a `Result` type object that explicitly indicates success or failure. This makes the flow of the code more predictable and easier to reason about.
2. **Type Safety**: By using TypeScript's type system, we ensure that consumers of these methods handle both success and error cases correctly. This can help prevent runtime errors and improve code quality.
3. **Composability**: The `Result` type can be easily composed with other functions to handle errors in a consistent way. For example, you can use `map` and `flatMap` functions to chain together multiple operations that return `Result` types. We'll explore this in more detail in the next article.
4. **Predictable Control Flow**: By using the `Result` type, developeers can chain together multiple operations and handle errors in consistent manner, ofter using pattern matching or combinators to handle different cases.
5. **Avoiding Exceptions for Flow Control**: Functional programming discourages using exceptions for regular control flow. Instead errors are treated as data that can be passed around and handled in a predictable way.

## Takeaways

The transition from the initial implementation to one that uses the Result type exemplifies a shift towards functional programming principles:

- **Immutability**: While not fully illustrated in this example, FP encourages immutable data structures, which can lead to fewer bugs and easier reasoning about code.
- **Pure Functions**: Functions that, given the same input, always return the same output without side effects. While our repository interacts with a store, the use of `Result` types helps in maintaining purity by avoiding hidden side effects through exceptions.
- **Composability**: Functional code tends to be more composable, allowing small, reusable functions to build complex operations.

## Conclusion

Adopting functional programming principles can lead to more robust, predictable, and maintainable code. By using the `Result` type to handle errors explicitly, we can improve the clarity and reliability of our code. In the next article, we'll explore how to compose functions that return `Result` types to build more complex operations.
