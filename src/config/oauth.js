export const OAUTH_CONFIG = {
  client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
  client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
  redirect_uri: window.location.origin + '/callback', // http://localhost:5173/callback
  oauth_server: import.meta.env.VITE_OAUTH_SERVER, // Tu servidor Laravel
  scope: 'read profile',
  response_type: 'code'
};


export function generateState() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}