import React, { useMemo, useRef, useEffect } from "react"
import { View, Text } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { Button } from "../atoms"

export const TestSheet = () => {
    const sheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ["25%", "75%"], [])

    useEffect(() => {
        // Auto-open on mount for debugging
        setTimeout(() => sheetRef.current?.expand(), 500)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#111", padding: 20 }} className="mt-20">
            <Text style={{ color: "white", fontSize: 20 }}>Test Bottom Sheet</Text>

            <Button
                label="Open Sheet"
                onPress={() => sheetRef.current?.expand()}
            />
            <Button
                label="Force Expand"
                onPress={() => {
                    console.log("Attempting expand:", !!sheetRef.current)
                    sheetRef.current?.expand()
                }}
            />
            <View className="flex-1">
            <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 18 }}>Hello from BottomSheet 👋</Text>
                </View>
            </BottomSheet>
            </View>
        </View>
    )
}
