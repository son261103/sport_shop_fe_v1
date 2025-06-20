# API Error Fixes Documentation

## Issues Fixed

### 1. Missing Import in variantService.ts
**Problem**: `variantService.ts` was missing the `apiClient` import, causing undefined reference errors.

**Fix**: Added the missing import:
```typescript
import { apiClient } from '../api';
```

### 2. 404 Error on Refresh Token Endpoint
**Problem**: The API endpoint `/api/refresh` returns 404 (Not Found), indicating the backend doesn't implement this endpoint.

**Fixes Applied**:

#### A. Updated Auth Store Initialization
- Modified `initAuth()` to try fetching user data first instead of refreshing token
- Only attempt token refresh on 401 (Unauthorized) errors
- Added graceful handling for 404 refresh endpoint errors

#### B. Updated API Interceptor
- Removed automatic retry for 500 errors (only retry on 401)
- Added special handling for 404 refresh token errors
- Prevent clearing auth data when refresh endpoint doesn't exist
- Added appropriate warning messages for missing endpoints

### 3. 500 Internal Server Error on Variant Update
**Problem**: `PUT /api/admin/products/1/variants/6` returns 500 error.

**Potential Causes**:
1. Backend validation issues with FormData
2. Missing required fields
3. Database constraints
4. Authentication/authorization issues

## Backend API Requirements

Based on the errors, your backend API needs to implement:

### Required Endpoints

1. **Token Refresh** (Currently Missing - 404)
   ```
   POST /api/refresh
   Headers: Authorization: Bearer {token}
   Response: { status: boolean, data: { token: string, user: object } }
   ```

2. **Variant Update** (Currently Failing - 500)
   ```
   PUT /api/admin/products/{product_id}/variants/{variant_id}
   Content-Type: multipart/form-data
   Fields: size, color, stock_quantity, is_active, image (optional)
   ```

### Recommended Backend Fixes

1. **Implement Refresh Token Endpoint**:
   - Add route for `POST /api/refresh`
   - Validate existing token
   - Return new token if valid

2. **Fix Variant Update Endpoint**:
   - Check server logs for specific 500 error details
   - Validate FormData parsing
   - Ensure database constraints are met
   - Verify user permissions

3. **Add Proper Error Handling**:
   - Return meaningful error messages
   - Use appropriate HTTP status codes
   - Include validation error details

## Frontend Improvements Made

### Error Handling
- Graceful degradation when refresh endpoint is unavailable
- Better error logging and user feedback
- Prevent infinite retry loops

### Authentication Flow
- More robust initialization process
- Fallback mechanisms for missing endpoints
- Improved token management

## Testing the Fixes

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Check console for errors**:
   - Should see warnings instead of errors for missing refresh endpoint
   - No more undefined `apiClient` errors

3. **Test variant operations**:
   - Try updating a variant
   - Check network tab for actual error details

## Next Steps

1. **Backend Development**:
   - Implement missing refresh token endpoint
   - Fix variant update 500 error
   - Add proper error responses

2. **Frontend Enhancements**:
   - Add user-friendly error messages
   - Implement retry mechanisms
   - Add loading states

3. **Testing**:
   - Add unit tests for error scenarios
   - Test authentication flows
   - Validate API integrations

## Environment Configuration

Current API configuration:
```
VITE_API_BASE_URL=http://192.168.2.2:8000/api
```

Ensure your backend server is running on `192.168.2.2:8000` or update the `.env` file accordingly.