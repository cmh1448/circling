// import api from "@/api";
import api from "@/api";
import Logo from "@/components/Logo";
import Button from "@/components/base/Button";
import Card from "@/components/base/Card";
import Icon from "@/components/base/Icon";
import Input from "@/components/base/Input";
import Spinner from "@/components/base/Spinner";
import { authStore } from "@/stores/authStore";
// import { loginStore } from "@/stores/loginStore";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "zustand";

export default function LoginPage() {
  /* States */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Properties */
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const authContext = useStore(authStore);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: Record<string, string>) =>
      api.auth.signIn(email, password),

    onSuccess: (data) => {
      queryClient.invalidateQueries();

      authContext.login({
        user: data.user,
        accessToken: data.token,
        expireAt: data.expireAt,
      });

      if (location.pathname === "/login") navigate("/feeds");
    },
  });

  /* Methods & Callbacks */
  const handleLogin = () => {
    loginMutation.mutate({
      email,
      password,
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="flex flex-col gap-10 mx-8 mx">
        <div className="flex">
          <span className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <Icon icon="login" />
            로그인
          </span>
          <div className="flex-1" />
          <Logo />
        </div>
        <div className="flex flex-col gap-6 w-30">
          <Input
            placeholder="이메일"
            icon="email"
            onInput={(val) => setEmail(val)}
            error={loginMutation.isError}
          />
          <Input
            placeholder="비밀번호"
            icon="password"
            type="password"
            onInput={(val) => setPassword(val)}
            error={loginMutation.isError}
            onEntered={handleLogin}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="h-10 gap-1"
            variant="secondary"
            onClick={handleRegister}
          >
            <Icon icon="person " />
            회원가입
          </Button>
          <Button className="gap-1 h-10" onClick={handleLogin}>
            {!loginMutation.isLoading ? (
              <>
                <Icon icon="check" />
                로그인
              </>
            ) : (
              <Spinner size="25px" />
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
