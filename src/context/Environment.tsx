import { createContext, ReactNode, useContext } from "react";
import { PointerState } from "../types/PointerState";
import { ColorSchemeState } from "../types/ColorSchemeState";
import { ContrastState } from "../types/ContrastState";
import usePointer from "../hooks/usePointer";
import useColorScheme from "../hooks/useColorScheme";
import useContrast from "../hooks/useContrast";

// Context

const EnvironmentContext = createContext({} as EnvironmentValues);


export interface EnvironmentValues {
	pointer: PointerState
	colorScheme: ColorSchemeState
	contrast: ContrastState
}


type MediaContextProviderProps = {
	children: ReactNode
}

/**
 * Provides the Environment values to the children.
 */
export function Provider({ children }: MediaContextProviderProps) {
	const value: EnvironmentValues = {
		pointer: usePointer(),
		colorScheme: useColorScheme(),
		contrast: useContrast()
	}

	return (
		<EnvironmentContext.Provider value={value}>
			{children}
		</EnvironmentContext.Provider>
	)
}

/**
 * Provides access to the Environent context.
 */
export function useEnvironment(): EnvironmentValues {
	return useContext(EnvironmentContext)
}