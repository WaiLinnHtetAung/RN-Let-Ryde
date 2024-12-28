import { View, Text, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";

import { icons, images } from "@/constants";

import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // Todo: create database user

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling

      setVerification({
        ...verification,
        error: err.errors[0].message,
        state: "failed",
      });

      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="px-5 py-2">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

          <InputField
            label="Eamil"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign Up"
            className="mt-6"
            onPress={onSignUpPress}
          />
        </View>

        <OAuth />

        <Link
          href="/SignIn"
          className="text-lg text-center text-general-200 mt-7"
        >
          <Text>Already have an account? </Text>
          <Text className="text-primary-500 font-JakartaSemiBold">Log In</Text>
        </Link>
      </View>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") setShowSuccessModal(true);
        }}
      >
        <View className="bg-white px-5 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-3xl font-JakartaExtraBold">Verification</Text>
          <Text className="font-Jakarta mb-5">
            We've sent a verification code to {form.email}
          </Text>
          <InputField
            label="Code"
            icon={icons.lock}
            placeholder="12345"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code })}
          />

          {verification.error && (
            <Text className="text-sm text-red-500 mt-1">
              {verification.error}
            </Text>
          )}

          <CustomButton
            title="Verify Email"
            onPress={onVerifyPress}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-4 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaSemiBold text-center">
            Verified
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You've successfully verified your account.
          </Text>
          <CustomButton
            title="Browse Home"
            onPress={() => router.replace("/(root)/(tabs)/Home")}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
