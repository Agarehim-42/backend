import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import User from "../model/User.js";

const router = express.Router();

// 1. Bütün istifadəçiləri əldə etmək (yalnız admin)
router.get(
    "/users",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            next(error);
        }
    }
);

// 2. İstifadəçi məlumatlarını redaktə etmək (yalnız admin)
router.put(
    "/users/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    async (req, res, next) => {
        const { name, surname, email, code } = req.body;

        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { name, surname, email, code },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "İstifadəçi tapılmadı",
                });
            }

            res.status(200).json({
                success: true,
                message: "İstifadəçi məlumatları yeniləndi",
                user,
            });
        } catch (error) {
            next(error);
        }
    }
);

// 3. İstifadəçi silmək (yalnız admin)
router.delete(
    "/users/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "İstifadəçi tapılmadı",
                });
            }

            res.status(200).json({
                success: true,
                message: "İstifadəçi silindi",
            });
        } catch (error) {
            next(error);
        }
    }
);

// 4. İcazə yoxlamaq (yalnız admin)
router.get(
    "/check-permission",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "İcazəniz var!",
        });
    }
);

export default router;
