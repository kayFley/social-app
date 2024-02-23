import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'

export const INITIAL_USER = {
	id: '',
	name: '',
	username: '',
	email: '',
	imageUrl: '',
	bio: '',
}

const INITIAL_STATE = {
	user: INITIAL_USER,
	isLoading: false,
	isAuthenticated: false,
	setUser: () => {},
	setIsAuthenticated: () => {},
	checkAuthUser: async () => false as boolean,
}

type IContextType = {
	user: IUser
	isLoading: boolean
	setUser: React.Dispatch<React.SetStateAction<IUser>>
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
	checkAuthUser: () => Promise<boolean>
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser>(INITIAL_STATE)
	const [isLoading, setIsLoading] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentUser()

			if (currentAccount) {
				setUser({
					id: currentAccount.$id,
					name: currentAccount.name,
					username: currentAccount.username,
					email: currentAccount.email,
					imageUrl: currentAccount.imageUrl,
					bio: currentAccount.bio,
				})

				setIsAuthenticated(true)

				return true
			}

			return false
		} catch (error) {
			console.log(error)
			return false
		} finally {
			setIsLoading(false)
		}
	}

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback" === "[]" || localStorage.getItem('cookieFallback') === null)
    )
  }, [])

	const value = {
		user,
		setUser,
		isLoading,
		isAuthenticated,
		setIsAuthenticated,
		checkAuthUser,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext