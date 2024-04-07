import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as forge from 'node-forge';

export class UtilService {
  private readonly algorithm = 'aes-256-cbc';

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

  encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(text: string, key: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(key),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  formatDateToYYYYMMDD(date: string): string {

    let [month,day, year] = date.split('/')
    //The month value is zero-based in JavaScript, meaning 0 is January, 1 is February, and so forth. So you'll need to decrement the month by 1.
    const dateObj = new Date(+year, +month - 1, +day)
    let mm = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let dd = ('0' + dateObj.getDate()).slice(-2);
    let yy = dateObj.getFullYear();
    const dateString = yy + '-' + mm + '-' + dd;
    return dateString;

  }
}
