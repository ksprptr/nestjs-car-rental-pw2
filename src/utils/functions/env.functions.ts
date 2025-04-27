import * as Table from 'cli-table3';

/**
 * Function to pad start a string by 2 with '0'
 */
const padStart = (value: any): string => {
  return value.toString().padStart(2, '0');
};

/**
 * Function to get a new formatted date
 */
export const getNewFormattedDate = (): string => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const pm = hours >= 12 ? 'PM' : 'AM';

  return `\x1b[90m${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)} ${pm}\x1b[0m`;
};

/**
 * Function to check environment variables
 */
export const checkEnvVariables = () => {
  const table = new Table({ head: ['Status', 'Environment Variable'], style: { head: ['cyan'] } });

  const envVariables = [
    'PORT',
    'CORS_ORIGINS',
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_EXPIRES_IN',
    'JWT_REFRESH_EXPIRES_IN',
  ];

  console.log(`[${getNewFormattedDate()}] Checking environment variables...`);

  envVariables.map((envVariable) => {
    if (!process.env[envVariable]) return table.push(['❌', envVariable]);
    return table.push(['✅', envVariable]);
  });

  const missingEnvVariables = table
    .filter((envVariable) => envVariable[0] === '❌')
    .map((envVariable) => envVariable[1]);

  if (missingEnvVariables.length > 0) console.log(table.toString());

  console.log(`[${getNewFormattedDate()}] Environment variables checked!`);

  if (missingEnvVariables.length > 0) {
    console.error(
      `[${getNewFormattedDate()}] Some environment variables are missing. Check the .env file and fill in the missing variables.`,
    );
    process.exit();
  }
};
