import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(400).json({error: error.details[0].message});
        return;
    }
    next();
}

export default validateUser;
