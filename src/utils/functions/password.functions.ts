import * as bcrypt from 'bcrypt';

const saltRounds = 12;

/**
 * Function to has a password
 */
export const has = async (password: string): Promise<string> => {
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
export const compare = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(`[Error comparing password]: ${error}`);
  }
};
