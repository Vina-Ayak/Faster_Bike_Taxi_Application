// Vercel Serverless Function - Faster Bike Taxi API
// Full backend support with zero external dependencies (pure Node.js crypto & http)
const crypto = require('crypto');

// In-memory data store for serverless execution
const JWT_SECRET = process.env.JWT_SECRET || '94a08da1fecbb6e8b46990538c7b50b294a08da1fecbb6e8b46990538c7b50b2';

// Seed initial users
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@biketaxi.com',
    passwordHash: hashPassword('admin123'),
    phoneNumber: '9876543211',
    role: 'ADMIN',
    isActive: true
  },
  {
    id: 2,
    username: 'driver1',
    email: 'driver1@biketaxi.com',
    passwordHash: hashPassword('driver123'),
    phoneNumber: '9876543210',
    role: 'DRIVER',
    isActive: true
  }
];

// Seed initial driver applications
let applications = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    bikeNumber: 'TN43M9599',
    age: 28,
    phoneNumber: '9876543210',
    address: '12 Gandhi Road, Coimbatore',
    emergencyContact: '9876543219',
    drivingLicenseNumber: 'DL-TN43-2018-0091',
    status: 'APPROVED',
    userId: 2,
    submissionDate: '2026-09-15T08:30:00.000Z',
    lastModified: '2026-09-16T10:15:00.000Z'
  },
  {
    id: 2,
    name: 'Suresh Patel',
    bikeNumber: 'TN43M9999',
    age: 24,
    phoneNumber: '9876543212',
    address: '45 Lake View, Bangalore',
    emergencyContact: '9876543220',
    drivingLicenseNumber: 'DL-KA01-2020-0044',
    status: 'DOCUMENT_VERIFICATION',
    userId: null,
    submissionDate: '2026-09-17T05:25:50.000Z',
    lastModified: '2026-09-17T05:26:52.000Z'
  },
  {
    id: 3,
    name: 'Vinaayak N',
    bikeNumber: 'TN43M9590',
    age: 32,
    phoneNumber: '9876543213',
    address: '88 Cyber Park, Chennai',
    emergencyContact: '9876543221',
    drivingLicenseNumber: 'DL-TN09-2015-1102',
    status: 'UNDER_REVIEW',
    userId: null,
    submissionDate: '2026-09-17T09:01:28.000Z',
    lastModified: '2026-09-17T09:01:28.000Z'
  }
];

// Seed initial audit logs
let auditLogs = [
  {
    id: 1,
    action: 'UPDATE_APPLICATION_STATUS',
    entityType: 'DriverApplication',
    entityId: 1,
    adminUsername: 'admin',
    oldValues: 'status=UNDER_REVIEW',
    newValues: 'status=APPROVED',
    timestamp: '2026-09-16T10:15:00.000Z'
  },
  {
    id: 2,
    action: 'VERIFY_DOCUMENT',
    entityType: 'Document',
    entityId: 101,
    adminUsername: 'admin',
    oldValues: 'status=PENDING',
    newValues: 'status=VERIFIED',
    timestamp: '2026-09-16T09:40:00.000Z'
  }
];

// Seed initial documents
let documents = [
  {
    id: 101,
    applicationId: 1,
    documentType: 'DRIVING_LICENSE',
    fileName: 'license_rajesh.pdf',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'admin',
    uploadDate: '2026-09-15T08:45:00.000Z'
  },
  {
    id: 102,
    applicationId: 1,
    documentType: 'VEHICLE_RC',
    fileName: 'rc_rajesh_tn43m9599.pdf',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'admin',
    uploadDate: '2026-09-15T08:50:00.000Z'
  },
  {
    id: 103,
    applicationId: 2,
    documentType: 'DRIVING_LICENSE',
    fileName: 'license_suresh.pdf',
    verificationStatus: 'PENDING',
    verifiedBy: null,
    uploadDate: '2026-09-17T05:30:00.000Z'
  }
];

function hashPassword(password) {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

function generateToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: user.username,
    role: user.role,
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 86400
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
    if (signature !== expectedSig) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
    return;
  }

  // Parse path & query
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;
  // If path starts with /api/, normalize
  const method = req.method;
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const currentUser = verifyToken(token);

  // 1. Auth: Register
  if (pathname === '/api/auth/register' && method === 'POST') {
    const body = await parseBody(req);
    const { username, email, password, phoneNumber, role } = body;
    if (!username || !email || !password || !phoneNumber) {
      return sendJson(res, 400, { error: 'All fields are required!' });
    }
    if (users.find(u => u.username === username)) {
      return sendJson(res, 400, { error: 'Username is already taken!' });
    }
    if (users.find(u => u.email === email)) {
      return sendJson(res, 400, { error: 'Email is already taken!' });
    }

    const newUser = {
      id: users.length + 1,
      username,
      email,
      passwordHash: hashPassword(password),
      phoneNumber,
      role: role || 'DRIVER',
      isActive: true
    };
    users.push(newUser);
    const jwtToken = generateToken(newUser);
    return sendJson(res, 200, { token: jwtToken, role: newUser.role });
  }

  // 2. Auth: Login
  if (pathname === '/api/auth/login' && method === 'POST') {
    const body = await parseBody(req);
    const { username, password } = body;
    const user = users.find(u => u.username === username);
    if (!user || user.passwordHash !== hashPassword(password || '')) {
      return sendJson(res, 401, 'failed to login user not found');
    }
    const jwtToken = generateToken(user);
    return sendJson(res, 200, { token: jwtToken, role: user.role });
  }

  // 3. Auth: Profile
  if (pathname === '/api/auth/profile' && method === 'GET') {
    if (!currentUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const user = users.find(u => u.username === currentUser.sub);
    if (!user) return sendJson(res, 404, { error: 'User not found' });
    return sendJson(res, 200, {
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isActive: user.isActive
    });
  }

  // 4. Biketaxi: Add application
  if ((pathname === '/addBiketaxi' || pathname === '/api/biketaxi') && method === 'POST') {
    const body = await parseBody(req);
    const existingIndex = applications.findIndex(a => a.bikeNumber === body.bikeNumber);
    const newApp = {
      id: existingIndex >= 0 ? applications[existingIndex].id : applications.length + 1,
      name: body.name,
      bikeNumber: body.bikeNumber,
      age: Number(body.age),
      phoneNumber: body.phoneNumber,
      address: body.address || null,
      emergencyContact: body.emergencyContact || null,
      drivingLicenseNumber: body.drivingLicenseNumber || null,
      status: body.status || 'DRAFT',
      userId: currentUser ? currentUser.id : null,
      submissionDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      applications[existingIndex] = newApp;
    } else {
      applications.push(newApp);
    }
    return sendJson(res, 200, newApp);
  }

  // 5. Biketaxi: Get all applications
  if ((pathname === '/getAllBiketaxi' || pathname === '/api/biketaxi') && method === 'GET') {
    return sendJson(res, 200, applications);
  }

  // 6. Biketaxi: Get by ID or status
  const idMatch = pathname.match(/^\/api\/biketaxi\/(\d+)$/);
  if (idMatch && method === 'GET') {
    const id = parseInt(idMatch[1], 10);
    const app = applications.find(a => a.id === id);
    if (!app) return sendJson(res, 404, { error: 'Application not found' });
    return sendJson(res, 200, app);
  }

  // 7. Biketaxi: Update Status
  const statusUpdateMatch = pathname.match(/^\/api\/biketaxi\/(\d+)\/status$/);
  if (statusUpdateMatch && method === 'PUT') {
    const id = parseInt(statusUpdateMatch[1], 10);
    const newStatus = parsedUrl.searchParams.get('status');
    const app = applications.find(a => a.id === id);
    if (!app) return sendJson(res, 404, { error: 'Application not found' });
    
    const oldStatus = app.status;
    app.status = newStatus || app.status;
    app.lastModified = new Date().toISOString();

    // Add audit log
    auditLogs.unshift({
      id: auditLogs.length + 1,
      action: 'UPDATE_APPLICATION_STATUS',
      entityType: 'DriverApplication',
      entityId: id,
      adminUsername: currentUser ? currentUser.sub : 'Admin',
      oldValues: `status=${oldStatus}`,
      newValues: `status=${newStatus}`,
      timestamp: new Date().toISOString()
    });

    return sendJson(res, 200, app);
  }

  // 8. Biketaxi: Delete
  if (idMatch && method === 'DELETE') {
    const id = parseInt(idMatch[1], 10);
    const index = applications.findIndex(a => a.id === id);
    if (index >= 0) {
      applications.splice(index, 1);
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end();
      return;
    }
    return sendJson(res, 404, { error: 'Application not found' });
  }

  // 9. Operations: Performance Stats
  if (pathname === '/api/operations/performance/my-stats' && method === 'GET') {
    return sendJson(res, 200, {
      totalRides: 142,
      completedRides: 138,
      cancelledRides: 4,
      averageRating: 4.85,
      totalEarnings: '18450.00',
      performanceScore: 96,
      status: 'ACTIVE',
      lastActiveDate: new Date().toISOString()
    });
  }

  // 10. Operations: Audit Logs
  if (pathname === '/api/operations/audit-logs' && method === 'GET') {
    return sendJson(res, 200, auditLogs);
  }

  // 11. Operations: Documents
  const docAppMatch = pathname.match(/^\/api\/operations\/documents\/(\d+)$/);
  if (docAppMatch && method === 'GET') {
    const appId = parseInt(docAppMatch[1], 10);
    const docs = documents.filter(d => d.applicationId === appId);
    return sendJson(res, 200, docs);
  }

  const docVerifyMatch = pathname.match(/^\/api\/operations\/documents\/(\d+)\/verify$/);
  if (docVerifyMatch && method === 'PUT') {
    const docId = parseInt(docVerifyMatch[1], 10);
    const doc = documents.find(d => d.id === docId);
    if (!doc) return sendJson(res, 404, { error: 'Document not found' });
    doc.verificationStatus = 'VERIFIED';
    doc.verifiedBy = currentUser ? currentUser.sub : 'admin';
    return sendJson(res, 200, doc);
  }

  // Fallback for other /api routes
  return sendJson(res, 404, { error: 'Route not found', path: pathname });
};
