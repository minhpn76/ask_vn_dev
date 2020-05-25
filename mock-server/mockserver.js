const jsonServer = require('json-server');
const _ = require('lodash');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
// const db = require('./db.json');

let isAuthenticated = false;
server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// TODO: temporary user auth
server.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.username === 'admin') {
    if (req.body.password === 'admin') {
      isAuthenticated = true;
    }
  }
  if (isAuthenticated) {
    res.jsonp({
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JlcnRnbGFzZXJAdmFsdWVzdHJlYW1lci5kZSIsImV4cCI6MTU3ODQwOTQwMCwidXVpZCI6IjQxZTc1NjNhLTE1MjQtNGE0MS1hZmU4LTJlYmFjZWNkNGNhMCIsImlhdCI6MTU3NjY1NjM2OH0.QeU1HlBwJMFmvibpqBB6HFU-iyvxaY2I7eg_stIzLxaEBobMxs9ErugsRdHiTWXP2tvBCy4AQvA767s3ZyIHBA',
      userId: '41e7563a-1524-4a41-afe8-2ebacecd4ca0',
      user_info: {
        id: '41e7563a-1524-4a41-afe8-2ebacecd4ca0',
        alias: 'minhpn',
        country: 'VN',
        email: 'minhpn@grr.la',
        enabled: false,
        first_name: 'Minh',
        language: 'VietNamese',
        last_name: 'PN',
        timezone: 'UTC +7',
        version: 0,
        team_id: '7c0d82b5-b943-4576-8a86-438de3266ae4',
        capacity: 40.0,
        spare_capacity: null,
        img: null,
      },
    });
  } else {
    res.status(400).jsonp({ error: 'general' });
  }
});

server.post('/api/map/get_featured_travel_maps', function(req, res) {
  res.status(200);
  const travels = require('./db-travel-maps.json');
  res.jsonp(travels);
});

server.get('/api/map/get_featured_filter', function(req, res) {
  res.status(200);
  const filter = require('./db-filter.json');
  res.jsonp(filter);
});

server.post('/api/map/get_featured_paper_maps', function(req, res) {
  res.status(200);
  const papers = require('./db-paper-maps.json');
  res.jsonp(papers);
});

server.get('/api/post/top', function(req, res) {
  res.status(200);
  const postTop = require('./db-top.json');
  res.jsonp(postTop);
});

server.get('/api/map/get_travel_maps', function(req, res) {
  res.status(200);
  const travelMaps = require('./db-travel-map.json');
  res.jsonp(travelMaps);
});

server.post('/api/register', function(req, res) {
  res.status(200);
  const signUp = require('./db-signup.json');
  res.jsonp(signUp);
});

server.post('/api/login', function(req, res) {
  res.status(200);
  const logIn = require('./db-login.json');
  res.jsonp(logIn);
});

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);

server.use(router);
server.listen(8082, () => {
  console.log('JSON Server is running at http://localhost:8082');
});
