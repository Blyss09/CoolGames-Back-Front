const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

//User
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;