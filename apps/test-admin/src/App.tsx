import { AuthProvider } from '@repo/rbac';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router';

function App() {
  return (
    <AuthProvider apiBaseUrl="/api">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;