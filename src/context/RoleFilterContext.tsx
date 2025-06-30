// src/context/RoleFilterContext.tsx

"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type RoleType = "student" | "teacher"

interface RoleFilterContextType {
  role: RoleType
  setRole: (role: RoleType) => void
}

const RoleFilterContext = createContext<RoleFilterContextType | undefined>(undefined)

export const RoleFilterProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<RoleType>("student")

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as RoleType | null
    if (storedRole) setRoleState(storedRole)
  }, [])

  const setRole = (role: RoleType) => {
    localStorage.setItem("role", role)
    setRoleState(role)
  }

  return (
    <RoleFilterContext.Provider value={{ role, setRole }}>
      {children}
    </RoleFilterContext.Provider>
  )
}

export const useRoleFilter = () => {
  const context = useContext(RoleFilterContext)
  if (!context) throw new Error("useRoleFilter must be used within RoleFilterProvider")
  return context
}
