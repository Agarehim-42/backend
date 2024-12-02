




import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import User from "../model/User.js";

const router = express.Router();

// Qeydiyyatdan keçmiş istifadəçiləri əldə et
router.get(
    "/users",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    async (req, res) => {
        const users = await User.find();
        res.json(users);
    }
);

// İstifadəçini dəyiş
router.put(
    "/users/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    async (req, res) => {
        const { name, surname, email, code } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, surname, email, code },
            { new: true }
        );
        res.json(user);
    }
);

// İstifadəçini sil
router.delete(
    "/users/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "İstifadəçi silindi" });
    }
);

export default router;

//Elaveler