import LoadingScreen from "@/components/common/LoadingScreen"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types/index.types"
import type { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined)
        if (isLoading) {
            return <LoadingScreen />
        }
        if (!data?.data?.email && !isLoading) {
            return <Navigate to={"/login"} />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
            return <Navigate to={"/unauthorized"} />
        }

        return <Component />
    }
}