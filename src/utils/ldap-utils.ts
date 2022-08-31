export const parseDN = (dn?: string) => {
  if (!dn) return;
  const parts = dn.split(",");

  return parts.reverse();
};
