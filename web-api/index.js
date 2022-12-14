import http from "http";
import { converter } from "./converter.js";
import { PORT } from "./constants.js";

/**
 * The function creates an open connection and can accept requests and respond
 * @constructor
 */

http
  .createServer((request, response) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", async () => {
      try {
        const result = await converter(JSON.parse(data));
        response.end(result);
      } catch (error) {
        const errorString = JSON.stringify(error);
        response.end(errorString);
      }
    });
  })
  .listen(PORT, () => console.log(`Server start port:${PORT}`));
