import http from "http";
import { v4 as uuidv4 } from "uuid";
import { todos } from "./model/todoModel.js";
import { errorHandle, successHandle } from "./utils/requestHandler.js";
import { errorMsg } from "./utils/errorMsg.js";

const requestListener = (req, res) => {
  const error = msg => errorHandle(res, 400, msg);

  if (req.url == "/todos" && req.method == "GET") {
    // getTodo.js
    successHandle(res, JSON.stringify(todos))
  } else if (req.url == "/todos" && req.method == "POST") {
    // postTodo.js
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.title || !data.content) {
          error(errorMsg.POST);
          return;
        }
        todos.push({ ...data, id: uuidv4() });
        successHandle(res, JSON.stringify(todos))
      } catch {
        error(errorMsg.POST);
      }
    });
  } else if (req.url == "/todos" && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    // patchTodo.js
  } else if (req.method == "OPTIONS") {
    successHandle(res)
  } else {
    errorHandle(res, 404, errorMsg.NOTFOUND);
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);