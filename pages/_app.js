import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  	return (
		<>
		<ToastContainer position="top-left" newestOnTop={true} pauseOnHover={false} autoClose={3000} />

		<QueryClientProvider client={queryClient}>
			<div className="font-Montserrat-Alt">
				<Component {...pageProps} />
			</div>
		</QueryClientProvider>
		</>
	)
}

export default MyApp
