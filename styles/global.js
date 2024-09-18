import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    maxWidth: 500,
    padding: 35,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 2,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 24,
    fontWeight: "300",
    color: "#374B96",
    paddingLeft: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "navy",
    padding: 10, // Increased padding for better touch area
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16, // Adjusted font size for better readability
    fontWeight: "400",
  },
  signuptext: {
    color: "grey",
    fontSize: 13, // Adjusted font size for better readability
    fontWeight: "400",
    marginTop: 20,
    alignSelf: "center",
  },
  signuptext2: {
    color: "blue",
    fontWeight: "bold",
  },
  inputLabel: {
    marginBottom: 10,
    alignItems: "left",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },

  inputWithIcon: {
    width: "100%",
    paddingRight: 40, // Space for the eye icon
    paddingLeft: 10,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },

  eyeIcon: {
    position: "absolute",
    right: 10, // Positioning inside the input field
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
