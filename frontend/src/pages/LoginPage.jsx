// import React from "react";
import { FormGroup } from "../components/fields";
import Label from "../components/labels/Label";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../hooks/useToggleValue";
import IconEyeToggle from "../components/icons/IconEyeToggle";
import { useAuth } from "../stores/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import authApi from "../api/auth";
import { setTokenService } from "../utils/localStorage";
import { toast } from "react-toastify";
import { useEffect } from "react";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  <div>Login Page</div>;
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue(false);
  const setUser = useAuth((store) => store.setUser);
  const navigate = useNavigate();
  const fetchAuthUser = async () => {
    const response = await authApi.getMe();
    return response;
  };

  const { refetch, isSuccess, isError, error, data } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    enabled: false,
    select: (data) => data,
    retry: 1,
  });
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error auth user",
        description: error.message,
        status: "error",
      });
    }
  }, [isError, error]);
  if (isSuccess) {
    console.log("success? ", isSuccess);
    setUser(data);
  }

  const handleSignIn = async (values) => {
    if (isSubmitting || !isValid) return;

    const { username, password } = values;

    try {
      const response = await authApi.login(username, password);
      const { status, message } = response;
      if (status === 200) {
        const access_token = response.access_token;
        setTokenService(access_token);
        refetch();
        console.log(status);
        console.log("before navigate");
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't login. Please try again later");
    }
  };
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
          <IconEyeToggle
            open={showPassword}
            onClick={handleTogglePassword}
          ></IconEyeToggle>
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
