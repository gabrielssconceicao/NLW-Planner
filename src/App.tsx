import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello World!</h1>,
  },
  {
    path: '/teste',
    element: <h1>Hello Test!</h1>,
  },
]);
export function App() {
  return <RouterProvider router={router} />;
}
