export function useValidatedId(id?: string) {
  const isValidId = /^\d+$/.test(id ?? "");
  const validatedId = isValidId ? parseInt(id!) : null;

  return { id: validatedId, isValid: isValidId };
}
