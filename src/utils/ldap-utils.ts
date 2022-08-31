export const parseUsernameLDAP = (dn: string) => {
  const parts = dn.split(",");
  if (!parts[0]) return;
  return parts[0].split("=")[1];
};
