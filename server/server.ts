// server.ts
import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5002;
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));
// Put all API endpoints under '/api'
// 
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
