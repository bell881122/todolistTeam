import http from 'http';
import { errorHandle, successHandle } from './utils/responseHandler.js';
import { errorMsg } from './utils/errorMsg.js';
import { getTodos,postTodos } from './controller/todosController.js';

const requestListener = (req, res) => {

  if (req.url == '/todos' && req.method == 'GET') {
    // 透過呼叫controller的getTodos函式取得回應
    getTodos(res);

  } else if (req.url == '/todos' && req.method == 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      // 透過呼叫controller的postTodos函式新增資料
      postTodos(res,body);
    });
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    // deleteTodo.js
  } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    // deleteTodo.js
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    // patchTodo.js
  } else if (req.method == 'OPTIONS') {
    successHandle(res);
  } else {
    errorHandle(res, errorMsg.NOT_FOUND, 404);
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
