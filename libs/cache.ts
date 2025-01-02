import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as Linking from "expo-linking";
import { storeUser } from "@/services/useUserService";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

// SecureStore is not supported on the web
export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signUp, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/Home", {
        scheme: "myapp",
      }),
    });

    // If sign in was successful, set the active session
    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          // store user in db
          await storeUser(
            signUp.firstName + " " + signUp.lastName,
            signUp.emailAddress,
            signUp.createdUserId,
          );
        }
        return {
          success: true,
          code: "success",
          message: "You have successfully authenticated.",
        };
      }
    }
    return {
      success: false,
      message: "An error occoured.",
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error?.errors[0].longMessage,
    };
  }
};
