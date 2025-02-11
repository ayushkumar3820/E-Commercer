// Router/user.js
import express from "express";

import { register, login, logout } from "../Controller/userController.js";
import validate from "../validation/index.js";
import { authMiddleware, admin } from "../middleware/auth.middlerware.js";
import {
  productArrival,
  productBestSeller,
  productDelete,
  productGet,
  productGetId,
  productPost,
  productSimilarGet,
  productUpdate,
} from "../Controller/productController.js";
import { cart, cartDeleted, cartGet, cartMerger, cartProduct } from "../Controller/CartController.js";
import { checkoutPost, checkoutPostById, checkoutPut } from "../Controller/checkoutController.js";
import { myOrder, orderGet } from "../Controller/OrderController.js";
import { subscriptionController } from "../Controller/subscriptionController.js";
import { userDelete, userGet, userPost, userPut } from "../Controller/userfind.js";
import { orderAdminDelete, orderAdminPut, OrderAdminRouter, productAdminRoute } from "../Controller/productadmin.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: User's password (min 6 characters)
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Confirm password (must match password)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", validate.login, login);
router.get("/logout", logout);
router.get("/profile", authMiddleware, async (req, res) => {
  res.json(req.user);
});

router.post("/products", authMiddleware, admin, productPost);
router.put("/products/:id", authMiddleware, admin, productUpdate);

router.delete("/products/:id", authMiddleware, admin, productDelete);
router.get("/products", authMiddleware, admin, productGet);
router.get("/products/:id", productGetId);
router.get("/products/similar/:id", productSimilarGet);
router.get("/products/best-seller", authMiddleware, admin, productBestSeller);
router.get("/products/productArrival", authMiddleware, admin, productArrival);


router.post("/cart",cart);
router.put("/cartUpdate",authMiddleware, admin,cartProduct);
router.delete("/cart/delete",authMiddleware,cartDeleted);
router.get("/cart/get",cartGet);
router.get("/cart/merger",cartMerger);


router.post("/checkout",authMiddleware,checkoutPost);
router.put("/checkout/:id",authMiddleware,checkoutPut);
router.post("/checkout/finalize/:id",authMiddleware,checkoutPostById);


//order
router.get("/order",authMiddleware,myOrder);
router.get("/order/:id",authMiddleware,orderGet);


router.post("/subscribed",subscriptionController);


router.get("/user",authMiddleware,admin,userGet);
router.post("/user",authMiddleware,admin,userPost);
router.put("/user/:id",authMiddleware,admin,userPut);
router.delete("/user/:id",authMiddleware,admin,userDelete);


router.get("/product",authMiddleware,admin,productAdminRoute);

router.get("/orders",authMiddleware,admin,OrderAdminRouter);
router.put("/orders/:id",authMiddleware,admin,orderAdminPut);

router.delete("/orders/:id",authMiddleware,admin,orderAdminDelete);
export default router;
