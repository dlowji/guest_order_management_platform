import React from "react";
import { FormGroup } from "../components/fields";
import Label from "../components/labels/Label";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../hooks/useToggleValue";
import IconEyeToggle from "../components/icons/IconEyeToggle";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  // remember: yup.boolean(),
});

const LoginPage = () => {
  <div>Login Page</div>
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const {value:showPassword, handleToggleValue: handleTogglePassword} = useToggleValue(false);

  const handleSignIn = async (values) => {
    if (isSubmitting || !isValid) return;

    const {username, password} = values;
    console.log("🚀 ~ handleSignIn ~ password:", password)
    console.log("🚀 ~ handleSignIn ~ username:", username)
  }
  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          control={control}
          placeholder="Enter your username"
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          control={control}
          placeholder="Enter your password"
        >
            <IconEyeToggle open={showPassword} onClick={handleTogglePassword}></IconEyeToggle>
        </Input>
      </FormGroup>
      <Button
        type="submit"
        className="w-full text-white"
        isLoading={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
};

export default LoginPage;
