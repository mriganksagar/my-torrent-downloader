import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import { TorrentList } from './components';
import { loadFilesInfo } from './lib/route-loaders/loadFileInfo.ts';
import './tailwind.css'
import { FilesView } from './components/FilesView.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Navigate to="/dashboard" />
  },
  {
    path:'/',
    element: <App/>,
    children:[
      {
        path: 'dashboard',
        element: <TorrentList/>
      },
      {
        path: 'torrents/:id/files',
        element: <FilesView/>,
        loader: loadFilesInfo 
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
