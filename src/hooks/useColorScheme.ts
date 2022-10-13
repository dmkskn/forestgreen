import { useEffect, useState } from "react"
import { ColorSchemeState } from "../types/ColorSchemeState"

/**
 * A hook to get the current color scheme (from to media queries).
 */
export default function useColorScheme(): ColorSchemeState {
	const [theme, setTheme] = useState("light" as ColorSchemeState)

	useEffect(() => {
		function updateColorScheme() {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				setTheme("dark")
			} else {
				setTheme("light")
			}
		}

		updateColorScheme()

		const media = window.matchMedia("(prefers-color-scheme: dark)")
		media.addEventListener("change", updateColorScheme)

		return () => {
			media.removeEventListener("change", updateColorScheme)
		}
	}, [])

	return theme
}