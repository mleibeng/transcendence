// Define API endpoints
// Handle HTTP requests
// Example: POST /api/auth/login

// -> hand over to correct controller


// Initial Authentication Flow:
// 1. User sends email/password
// Route -> Controller -> Service -> Model -> Database
// ↓
// 2. Verify credentials
// Database -> Model -> Service (password check)
// ↓
// 3. Generate JWT token
// Service (creates JWT) -> Controller -> Client receives token


// Subsequent Request Flow (Using JWT):
// 1. User sends request with JWT in header
//    Request -> Middleware (checks JWT)
//    ↓
// 2. If JWT valid:
//    Middleware -> Route -> Controller -> etc.
//    ↓
// 3. If JWT invalid:
//    Middleware -> 401 Unauthorized Response