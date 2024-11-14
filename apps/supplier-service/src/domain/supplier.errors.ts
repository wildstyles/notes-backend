import { ErrorBase } from '@repo/common/ddd';

export class MaxSuppliesReachedError extends ErrorBase {
  readonly code = 'Supplier.MAX_SUPPLIES_REACHED';

  private static readonly message = 'Max supplies reached';

  constructor() {
    super(MaxSuppliesReachedError.message);
  }
}
