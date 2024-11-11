import { Id } from '../../../../libs/ddd/base.model';

import { AggregateRoot } from '@app/libs/ddd/base.aggregate-root';

interface UserProps {
  name: string;
  email: string;
  age: number;
  password: string;
}

type CreateUserProps = UserProps;

export type UserId = Id<'User'>;

export class UserModel extends AggregateRoot<UserProps, UserId> {
  static create(props: CreateUserProps): UserModel {
    const supplier = new UserModel({
      props: { ...props, password: `${props.password}hashed` },
    });

    return supplier;
  }
}
