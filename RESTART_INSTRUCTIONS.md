# How to Restart the Development Server

After making changes to environment variables or configuration files, you need to restart your development server for the changes to take effect.

## If your development server is currently running:

1. Go to the terminal where your development server is running
2. Press `Ctrl + C` to stop the server
3. Run the development server again:
   ```bash
   npm run dev
   ```

## If you're using a different terminal:

1. Open a new terminal in your project directory
2. Run the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting

If you're still experiencing issues after restarting:

1. Clear the cache:
   ```bash
   npm start --reset-cache
   ```

2. Or delete the `node_modules` folder and reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

Note: On Windows, use `rmdir /s node_modules` instead of `rm -rf node_modules`