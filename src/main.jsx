import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

// Fix router structure
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // children: [
    //   {
    //     path: '',
    //     children: [

    //       {
    //         path: '/graphics/:id/:id2', 
    //         element: <ShowPortf />,
    //         errorElement: <Notfound />, // Handle errors for this route
    //       },

    //       {
    //         path: '/websites/:id/:id2', 
    //         element: <ShowPortf />,
    //         errorElement: <Notfound />, // Handle errors for this route
    //       },

    //     ],
    //   },
    // ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);