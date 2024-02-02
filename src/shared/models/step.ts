export class Step {
  constructor(
    public label: string,
    public component: () => JSX.Element,
  ) {}
}
