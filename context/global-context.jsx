import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const GlobalContextProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			try {
				const auth = await SecureStore.getItemAsync("auth");

				if (!auth) {
					setIsLoading(false);
					return;
				}
				setAuth(JSON.parse(auth));
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		getUser();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				auth,
				setAuth,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
