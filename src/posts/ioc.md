---
title: "Inversion of Control container"
date: "2020-03-03"
category: ["JavaScript", "Node.js", "IoC"]
cover: "/images/blog/blog-image-7.jpg"
thumb: "/images/blog/sm/ioc-thumb.png"
---

## Inversion of Control container implementation

[GitHub Repo](https://github.com/matewilk/IoC) - for the full source code

Inversion of Control (IoC) is a design pattern that allows for decoupling of components. It is a way of implementing dependency injection (DI) in a software application. The main goal of IoC is to reduce the amount of code that is tightly coupled to other components. This allows for easier testing and maintenance of the application.

### Main Features

- can be used either with classes or higher-order-functions
- dependencies are injected using a single object - resolve dependencies with object destructuring
- give your dependencies names when configuring them
- container throws when
  - circular dependency is detected
  - registering dependency with the same key
  - trying to resolve dependency with name that was not registered
  - registered dependency does not have a resolver function / class

### How to use

There are two main functions allowing configuration:

- `add` - adds service to container
  - takes two arguments
    - name: string - service name with which it is injected
    - resolver: function / class - that will receive dependencies
- `to` - only possible to use by chaining with `add`
  - takes one argument
    - name: string - service to which inject the dependency specified in `add`

And one function to resolve all the dependencies:

- `get` - resolves all the dependencies and injects them to appropriate services

### Example usage

`car` function expects two dependencies `wheels` and `engine`

`wheels` function expects to have wheel `type` dependency injected/passed to it

```javascript
export const car =
  ({ wheels, engine }) =>
  () => ({
    start: function () {
      return engine();
    },
    wheels: function () {
      return wheels();
    },
  });
export const wheels =
  ({ type }) =>
  () => {
    return type();
  };
export const type = () => {
  return "steel wheels";
};
export const engine = () => {
  return "wroom wroom";
};
```

To achieve this the following configuration has to be created:

```javascript
const container = new Container();
container.add("wheels", wheels).to("car");
container.add("type", type).to("wheels");
container.add("engine", engine).to("car");
container.add("car", car);
```

The full config file example can be seen [here](https://github.com/matewilk/IoC/blob/master/car/car.container.config.js)

The order in which dependencies are added does not matter as the resolution happens in the next step using `get`:

```javascript
const car = container.get("car");
car.start(); // wroom wroom
car.wheels(); // steel wheels
```

Feel fee to look at the [container test file](https://github.com/matewilk/IoC/blob/master/lib/container.test.js) to find out how the container works.
