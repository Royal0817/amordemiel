// const express = require('express');
// const path = require('path');
// const app = express();

// // Set CORS headers
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// // Serve static files from the 'build' directory
// app.use(express.static(path.join(__dirname, 'build')));

// // Wildcard route to serve index.html for any unmatched routes
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/build/static', 'index.html'));
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
