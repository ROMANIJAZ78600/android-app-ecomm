import { Stack } from "expo-router";
import "@/global.css";
import { CartProvider } from "@/context/cartcontext";
import { WishlistProvider } from "@/context/wishlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>


  <CartProvider>
    <WishlistProvider>

  <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(tabs)"  />
  </Stack>
    </WishlistProvider>
  </CartProvider>
    </GestureHandlerRootView>

  )
}
