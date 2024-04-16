export const validBody = (dataBody, schemaData) => {
  const result = schemaData.safeParse(dataBody);

  if (!result.success) {
    return result.error;
  }
  return null;
};
