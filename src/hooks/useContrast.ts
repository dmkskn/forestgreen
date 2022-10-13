import { useEffect, useState } from "react"
import { ContrastState } from "../types/ContrastState"


/**
 * A hook to get the current color scheme (from to media queries).
 */
export default function useContrast(): ContrastState {
	const [contrast, setContrast] = useState("no-preference" as ContrastState)

	useEffect(() => {
		function updateContrast() {
			if (window.matchMedia("(prefers-contrast: more)").matches) {
				setContrast("more")
			} else if (window.matchMedia("(prefers-contrast: less)").matches) {
				setContrast("less")
			} else if (window.matchMedia("(prefers-contrast: custom)").matches) {
				setContrast("custom")
			} else {
				setContrast("no-preference")
			}
		}

		updateContrast()

		const media = window.matchMedia("(prefers-contrast: no-preference)")
		media.addEventListener("change", updateContrast)

		return () => {
			media.removeEventListener("change", updateContrast)
		}
	}, [])

	return contrast
}