## Login with google.  

### Steps to setup
1. Go to https://console.cloud.google.com/ => API and services => Credentials
2. Create a new oAuth2.0 client id and choose web application in next page. 
3. generate client id and save it. Client secret is not needed in this flow
4. Go to https://developers.google.com/identity/gsi/web/tools/configurator and generate the html code

### Design
1. The sign in with google is not for session management.  
2. It is only to be used for password less auth. Session id etc needs to be managed by backend. 
3. In this code, i am using the jwt token returned by google as session token, but ideally the token should be created by our backend. 
4. This flow is not for authorization.
5. We need to implement an API in backend, say : /callback with post call. The jwt token will be sent to this API. and then we must verify the jwt token from google by getting the public key. 

### Steps to run
```
npm install
node index.js
```