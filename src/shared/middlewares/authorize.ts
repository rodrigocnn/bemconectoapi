import { Request, Response, NextFunction } from "express";

export function authorize(
  roles: string[],
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Acesso negado" });
      return;
    }

    next();
  };
}
