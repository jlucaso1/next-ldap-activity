export type Person = {
  dn: string;
  givenName: string;
  cn: string;
  mail: string;
  uid: string;
  role: Roles;
  password: string;
};

export type Roles = "seller" | "manager" | "user";
