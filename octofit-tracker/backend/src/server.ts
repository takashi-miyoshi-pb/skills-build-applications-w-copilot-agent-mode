import express from 'express';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;

const getBaseUrl = (): string => {
  if (CODESPACE_NAME) {
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    baseUrl: getBaseUrl(),
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${getBaseUrl()}`);
});

export default app;
