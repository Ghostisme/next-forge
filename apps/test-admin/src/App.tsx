import { AuthProvider } from '@repo/rbac';
import { StateProvider } from '@repo/state-management';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router';

function App() {
  return (
    <StateProvider>
      <AuthProvider apiBaseUrl="/api">
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </StateProvider>
  );
}

export default App;