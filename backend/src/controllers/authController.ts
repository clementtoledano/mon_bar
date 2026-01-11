import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../config/database';
import {
  hashPassword,
  comparePassword,
  generateToken,
  isValidDailyPassword,
} from '../utils/auth';

/**
 * Register validation rules
 */
export const registerValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

/**
 * Login validation rules (with daily password option)
 */
export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      res.status(409).json({ error: 'Email or username already exists' });
      return;
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password_hash,
      },
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
      },
    });

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Login with email and password (supports daily password: DDMMYYYY)
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check if password is today's daily password (DDMMYYYY)
    const isDailyPassword = isValidDailyPassword(password);

    // Verify password (either daily password or user's actual password)
    let isValidPassword = false;
    if (isDailyPassword) {
      isValidPassword = true;
    } else {
      isValidPassword = await comparePassword(password, user.password_hash);
    }

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get current user info (protected route)
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
        bars: {
          select: {
            id: true,
            name: true,
            cash: true,
            reputation_score: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
