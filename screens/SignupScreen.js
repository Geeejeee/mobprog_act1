import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import { signupValidation } from "../validation/signupValidation";
import { saveLoginData, getLoginData } from "../storage/userDetails";
import { showSuccessToast, showErrorToast } from "../components/toast.js";

const backgroundImage = {
  uri: "https://images.unsplash.com/photo-1530569673472-307dc017a82d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function SignupScreen({ navigation }) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!isConfirmPasswordVisible);
  };

  const handleSignup = async (values) => {
    const storedUser = await getLoginData();

    if (storedUser) {
      if (storedUser.email === values.email) {
        showErrorToast("Email is already registered");
      } else if (storedUser.userName === values.userName) {
        showErrorToast("Username is already registered");
      } else {
        // Save new user data to AsyncStorage
        await saveLoginData(
          values.firstName,
          values.lastName,
          values.email,
          values.userName,
          values.password
        );
        showSuccessToast(`Account created for ${values.firstName}!`);
        navigation.navigate("Login"); // Redirect to login after signup
      }
    } else {
      // Save new user data if no previous data exists
      await saveLoginData(
        values.firstName,
        values.lastName,
        values.email,
        values.userName,
        values.password
      );
      showSuccessToast(`Account created for ${values.firstName}!`);
      navigation.navigate("Login"); // Redirect to login after signup
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={backgroundImage} style={globalStyles.container}>
        <View style={globalStyles.innerContainer}>
          <View>
            <Text style={globalStyles.title}>Sign Up</Text>
          </View>

          <View style={globalStyles.form}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                userName: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signupValidation} // Apply validation
              onSubmit={(values) => handleSignup(values)} // Handle sign-up
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Text style={globalStyles.inputLabel}>First Name</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                  />
                  {errors.firstName && touched.firstName && (
                    <Text style={globalStyles.errorText}>
                      {errors.firstName}
                    </Text>
                  )}

                  <Text style={globalStyles.inputLabel}> {"\n"} Last Name</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                  />
                  {errors.lastName && touched.lastName && (
                    <Text style={globalStyles.errorText}>
                      {errors.lastName}
                    </Text>
                  )}

                  <Text style={globalStyles.inputLabel}> {"\n"} Email</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  {errors.email && touched.email && (
                    <Text style={globalStyles.errorText}>{errors.email}</Text>
                  )}

                  <Text style={globalStyles.inputLabel}> {"\n"} Username</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    value={values.userName}
                    onChangeText={handleChange("userName")}
                    onBlur={handleBlur("userName")}
                  />
                  {errors.userName && touched.userName && (
                    <Text style={globalStyles.errorText}>
                      {errors.userName}
                    </Text>
                  )}

                  <Text style={globalStyles.inputLabel}> {"\n"} Password</Text>
                  <View>
                    <TextInput
                      style={globalStyles.inputWithIcon}
                      placeholder="Password"
                      placeholderTextColor="#aaa"
                      secureTextEntry={!isPasswordVisible}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      style={globalStyles.eyeIcon}
                    >
                      <Icon
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="#aaa"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={globalStyles.errorText}>
                      {errors.password}
                    </Text>
                  )}

                  <Text style={globalStyles.inputLabel}>Confirm Password</Text>
                  <View>
                    <TextInput
                      style={globalStyles.inputWithIcon}
                      placeholder="Confirm Password"
                      placeholderTextColor="#aaa"
                      secureTextEntry={!isConfirmPasswordVisible}
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                    <TouchableOpacity
                      onPress={toggleConfirmPasswordVisibility}
                      style={globalStyles.eyeIcon}
                    >
                      <Icon
                        name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="#aaa"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={globalStyles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={globalStyles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={globalStyles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>

                  <Text style={globalStyles.signuptext}>
                    Already have an account?{" "}
                    <Text
                      style={globalStyles.signuptext2}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Log in!
                    </Text>
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
