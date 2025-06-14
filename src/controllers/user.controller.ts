import type { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
	private userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	async findAll(_req: Request, res: Response): Promise<void> {
		try {
			const users = await this.userService.findAll();
			res.json(users);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			} else {
				res.status(500).json({ message: "Unknown error occurred" });
			}
		}
	}
	async findByEmail(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    if (typeof email !== 'string' || !email.trim()) {
      res.status(400).json({ message: 'Email is required and must be a non-empty string' });
      return;
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in findByEmail:', error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}

}

