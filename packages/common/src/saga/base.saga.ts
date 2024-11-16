export interface ISagaContext<Params extends object = object> {
  initialParams: Params;
}

export interface ISagaStep<
  Context extends ISagaContext,
  UpdatedContext extends object,
> {
  execute: (context: Context) => Promise<Required<UpdatedContext>>;
  rollback: (context: Context) => Promise<void>;
}

export class SagaOrchestrator<
  Context extends ISagaContext<Params>,
  Steps extends readonly ISagaStep<Context, any>[],
  Params extends object,
> {
  protected steps: Steps;
  protected context: Context;

  constructor(steps: Steps) {
    this.steps = steps;
  }

  async execute(initialParams: Params): Promise<Required<Context>> {
    // console.log('Starting saga execution...');
    this.context = { ...this.context, initialParams };

    const executedSteps: ISagaStep<Context, any>[] = [];

    try {
      for (const step of this.steps) {
        const updatedContext = await step.execute(this.context);

        this.context = { ...this.context, ...updatedContext };

        executedSteps.unshift(step);
      }
    } catch (error) {
      // console.error(`Error during execution: ${error}. Rolling back...`);
      await this.compensate(executedSteps);

      throw error;
    }

    // console.log('Saga executed successfully');

    return this.context as Required<Context>;
  }

  private async compensate(
    executedSteps: ISagaStep<Context, any>[],
  ): Promise<void> {
    for (const step of executedSteps) {
      await step.rollback(this.context);
    }

    // console.log('All rollback steps executed successfully');
  }
}
