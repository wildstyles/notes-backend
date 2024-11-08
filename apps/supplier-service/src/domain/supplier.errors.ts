import { ErrorBase } from '../../../../libs/ddd/base.error';

export class MaxSuppliesReachedError extends ErrorBase {
  readonly code = 'Supplier.MAX_SUPPLIES_REACHED';

  private static readonly message = 'Max supplies reached';

  constructor() {
    super(MaxSuppliesReachedError.message);
  }
}
