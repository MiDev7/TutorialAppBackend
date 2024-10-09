function logger(res, req, next) {
  let currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${req.req.method} ${req.req.url} `);
  next();
}

export default logger;
