import * as bcrypt from 'bcrypt';

const saltRounds = 12;

/**
 * Function to hash a password
 */
export const hash = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error(`[Error hashing password]: ${error}`);
  }
};

/**
 * Function to compare a password with a hash
 */
export const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error(`[Error comparing password]: ${error}`);
  }
};
