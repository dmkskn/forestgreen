import { useEffect, useState } from "react"
import { PointerState } from "../types/PointerState"

/**
 * A hook to get CSS pointer (from to media queries).
 */
export default function usePointer(): PointerState {
	const [pointer, setPointer] = useState("none" as PointerState)

	useEffect(() => {
		function updatePointer() {
			if (window.matchMedia("(pointer: fine)").matches) {
				setPointer("fine")
			} else if (window.matchMedia("(pointer: coarse)").matches) {
				setPointer("coarse")
			} else {
				setPointer("none")
			}
		}

		updatePointer()

		const media = window.matchMedia("(pointer: fine)")
		media.addEventListener("change", updatePointer)

		return () => {
			media.removeEventListener("change", updatePointer)
		}
	}, [])

	return pointer
}