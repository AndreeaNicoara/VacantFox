// @ts-nocheck
/**
 * ! Bundling the fonts with the app instead of using CDN (Google fonts)
 * ! to eliminate extra nextwork roundtrip for fonts
 */
import '@fontsource/epilogue/300.css';
import '@fontsource/epilogue/400.css';
import '@fontsource/epilogue/500.css';
import '@fontsource/epilogue/600.css';
import '@fontsource/epilogue/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { AxiosRequestConfig } from 'axios';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import AuthProvider, { useAuth } from 'store/auth/provider';
import fetcher from 'api/fetcher';
import theme from 'theme';

const cache = createCache({
   key: 'job-search',
   prepend: true,

   // ! getting rid of the --webkit-etc prefix (crap) in development
   stylisPlugins: process.env.NODE_ENV === 'development' ? [] : undefined,
});

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);

function Main() {
   const { user } = useAuth();

   return (
      <SWRConfig
         value={{
            fetcher: (url: string, config: AxiosRequestConfig) =>
               fetcher(url, {
                  headers: {
                     Authorization: `Bearer ${user?.token}`,
                  },
                  ...config,
               }),
            suspense: true,
         }}
      >
         <App />
      </SWRConfig>
   );
}

root.render(
   <React.StrictMode>
      <CacheProvider value={cache}>
         <ThemeProvider theme={theme}>
            <CssBaseline />

            <BrowserRouter>
               <AuthProvider>
                  <Main />
               </AuthProvider>
            </BrowserRouter>
         </ThemeProvider>
      </CacheProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
