export interface StateIds<T> {
  byId: {
    [key: string | number]: T;
  };
  allIds: (string | number)[];
}
