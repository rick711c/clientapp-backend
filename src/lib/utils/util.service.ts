import * as bcrypt from 'bcrypt';

export class UtilService {
  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      // Compare the plain text password with the hashed password
      const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      // Handle errors, such as invalid hash or other bcrypt-related errors
      console.error('Error comparing passwords:', error);
      return false;
    }
  }


  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds to generate
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
