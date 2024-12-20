const usersRoot = 'users';
const suppliersRoot = 'suppliers';
const supplyRoot = 'supply';

const suppliersApiTag = 'Suppliers';
const usersApiTag = 'Users';

const v1 = 'v1';

export const routes: Record<Route, RouteSettings> & { version: string } = {
  version: v1,

  getUser: {
    apiTag: usersApiTag,
    params: { id: 'id' },
    path: function () {
      return `${usersRoot}/:${this.params.id}`;
    },
  },

  createUser: {
    apiTag: usersApiTag,
    params: {},
    path: function () {
      return usersRoot;
    },
  },

  createSupplier: {
    apiTag: suppliersApiTag,
    params: {},
    path: function () {
      return suppliersRoot;
    },
  },

  createSupply: {
    apiTag: suppliersApiTag,
    params: { supplierId: 'supplierId' },
    path: function () {
      return `${suppliersRoot}/:${this.params.supplierId}/${supplyRoot}`;
    },
  },
};

type Route = 'getUser' | 'createSupplier' | 'createSupply' | 'createUser';

type RouteSettings = {
  path: () => string;
  apiTag: string;
  params: Record<string, string>;
};
