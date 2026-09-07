export const isPrismaUniqueError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const prismaError = error as {
    code?: string;
  };

  return prismaError.code === "P2002";
};
