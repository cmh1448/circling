import api from "@/api";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import Input from "@/components/base/Input";
import Spinner from "@/components/base/Spinner";
import PageContainer from "@/components/pages/PageContainer";
import { SignUpRequest } from "@/models/User";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState<SignUpRequest>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    nickName: "",
  });

  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();

  const updateRegisterForm = (updater: (prev: SignUpRequest) => void) => {
    const prev = { ...registerForm };
    updater(prev);
    setRegisterForm(() => prev);
  };

  const [validCheck, setValidCheck] = useState(false);
  useEffect(() => {
    if (passwordCheck !== registerForm.password) setValidCheck(false);
    else if (
      registerForm.email === "" ||
      registerForm.firstName === "" ||
      registerForm.lastName === "" ||
      registerForm.password === "" ||
      registerForm.nickName === ""
    )
      setValidCheck(false);
    else if (!registerForm.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      setValidCheck(false);
    else setValidCheck(true);
  });

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () => api.auth.signUp(registerForm),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleRegister = () => {
    if (validCheck) mutate();
  };

  return (
    <PageContainer>
      <div className="text-2xl font-bold">회원가입</div>
      <div className="text-gray-500">
        아래 양식을 입력하여 회원가입을 진행하세요
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Input
          icon="mail"
          placeholder="이메일"
          onInput={(val) => updateRegisterForm((prev) => (prev.email = val))}
        />
        <div className="flex gap-2 w-full">
          <Input
            placeholder="성"
            className="flex-1"
            onInput={(val) =>
              updateRegisterForm((prev) => (prev.lastName = val))
            }
          />
          <Input
            placeholder="이름"
            className="flex-1"
            onInput={(val) =>
              updateRegisterForm((prev) => (prev.firstName = val))
            }
          />
        </div>
        <Input
          icon="person"
          placeholder="닉네임"
          onInput={(val) => updateRegisterForm((prev) => (prev.nickName = val))}
        />
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <Input
          icon="password"
          placeholder="비밀번호"
          type="password"
          onInput={(val) => updateRegisterForm((prev) => (prev.password = val))}
        />
        <Input
          icon="password"
          placeholder="비밀번호 확인"
          type="password"
          onInput={(val) => setPasswordCheck(val)}
        />
      </div>
      <Button
        className=" mt-4 w-full gap-1"
        enabled={validCheck}
        onClick={handleRegister}
      >
        {isLoading ? (
          <Spinner size="24px" />
        ) : (
          <>
            <Icon icon="send" fill />
            제출
          </>
        )}
      </Button>
    </PageContainer>
  );
}
