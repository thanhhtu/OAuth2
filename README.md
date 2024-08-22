# Oauth Authentication flow
## 1. User Requests Authorization 
   (1) User Initiates Login: The user clicks a login button on the client application [auth/google], indicating they want to authenticate.
   <br><br>
   (2) Client Redirects to Authorization Server: The client responds by redirecting the user to the OAuth authorization server’s authorization endpoint 
       with the necessary parameters such as client ID, redirect URI, response type (typically code), and scopes. 

## 2. User Grants Authorization
   (3) Authorization Server Presents Login/Consent: The authorization server prompts the user to log in and then asks the user to consent to the requested scopes.
   <br><br>
   (4) User Grants Consent: The user authenticates (if not already authenticated) and consents to the scopes requested by the client application.

## 3. Authorization Server Redirects Back to Client
   (5) Authorization Code: If the user grants consent, the authorization server redirects the user back to the client’s redirect URI with an authorization code [redirect URI is (/auth/google/callback), which was set when registering the client with Google].

## 4. Client Requests Access Token
   (6) Client Sends Authorization Code: The client application sends a request to the authorization server’s token endpoint [google_access_token_url], with a body that includes the authorization code received, client ID, client secret, and redirect URI.
   <br><br>
   (7) Authorization Server Validates and Issues Token: The authorization server validates the authorization code, client credentials, and redirect URI, then issues an access token (and optionally a refresh token) back to the client.

## 5. Client Accesses Protected Resources
   (8) Client Makes Authenticated Request: The client uses the access token to make requests to the resource server to access protected resources.
   <br><br>
   (9) Resource Server Validates Token: The resource server validates the access token with the auth server using middleware, and if valid, provides the requested resources to the client.