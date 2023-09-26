import Icon from "@/components/base/Icon";
import Button from "@components/base/Button.tsx";
import Logo from "@components/Logo.tsx";
import mjuSymbol from "@assets/images/mju_symbol.png";
import Divider from "@/components/base/Divider";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex gap-3 items-center">
        <img src={mjuSymbol} className="w-12" />
        <Divider variant="dot" />
        <Logo size="large" />
      </div>
      <div className="h-px w-80 bg-gray-500 my-5" />
      <div className="text-2xl font-bold text-gray-700 md:text-4xl">
        명지대학교 동아리 커뮤니티,{" "}
        <span className="text-gray-900">써클링</span>
        <span className="text-blue-500">!</span>
      </div>
      <div className="text-gray-400 px-2 py-4 text-sm md:text-lg text-center">
        명지대 학우들의 동아리 활동은 여기에서!
        <br />
        동아리 활동을 위한 모든것, 이자리에 있습니다.
        <br />
      </div>
      <div className="flex gap-4 py-5">
        <Button variant={"primary"} className="gap-2" onClick={handleLogin}>
          <Icon icon="login" />
          로그인하여 계속
        </Button>
        <Button variant={"third"}>더 알아보기</Button>
      </div>
    </div>
  );
}
