function logger(res, req, next) {
  currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${req.method} ${req.path}`);
}

export default logger;