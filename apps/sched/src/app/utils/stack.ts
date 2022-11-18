export class PStack<Type = any> {
  constructor() {
    const stack: Type[] = [];

    this.get = () => stack[0];
    this.pop = () => stack.shift()!;
    this.set = (input) => stack.unshift(input);
  }

  public get: () => Type;
  public pop: () => Type;
  public set: (input: Type) => void;
}
