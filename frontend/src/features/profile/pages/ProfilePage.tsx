import api from "@/api";
import Button from "@/components/base/Button";
import Card from "@/components/base/Card";
import Icon from "@/components/base/Icon";
import TextViewer from "@/components/editor/TextViewer";
import PageContainer from "@/components/pages/PageContainer";
import { SignUpRequest } from "@/models/User";
import { authStore } from "@/stores/authStore";
import { DateTime } from "luxon";
import { useQuery } from "react-query";
import { useStore } from "zustand";

export default function ProfilePage() {
  const authContext = useStore(authStore);

  const { data: myRegister, isLoading } = useQuery(["fetchMyRegister"], () =>
    api.circle.fetchMyRegister()
  );

  const data = [
    "남병준",
    "최정빈",
    "김대륙",
    "이지수",
    "이동현",
    "김종수",
    "민승기",
    "배석주",
    "박지민",
    "이창민",
    "정규철",
    "윤창섭",
    "조희윤",
    "방찬우",
    "김초은",
    "김진현",
    "신예림",
    "심주완",
    "오윤준",
    "이승우",
    "이정주",
    "장우재",
    "천제희",
    "장용찬",
    "최지원",
    "이가영",
    "김주영",
    "박유현",
    "배석현",
    "김경진",
  ];

  const handleAddDummy = () => {
    data.forEach((name) => {
      api.auth.signUp({
        email: name,
        lastName: name.substring(0, 1),
        firstName: name.substring(1, 3),
        nickName: name,
        password: "password",
      });
    });
  };
  return (
    <PageContainer>
      <div className="text-2xl font-bold">로그인 정보</div>

      <div className="grid grid-cols-2 w-fit mt-4">
        <span className="font-bold">이메일</span>
        <span className=" text-gray-500">{authContext.user?.email}</span>
        <span className="font-bold">성 이름</span>
        <span className=" text-gray-500">{`${authContext.user?.lastName} ${authContext.user?.firstName}`}</span>
        <span className="font-bold">닉네임</span>
        <span className=" text-gray-500">{authContext.user?.nickName}</span>
        <span className="font-bold">로그인 만료</span>
        <span className=" text-gray-500">
          {DateTime.fromISO(authContext.expireAt).toFormat("yyyy-MM-dd HH:mm")}
        </span>
      </div>

      <div className="mt-8">
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => authContext.logout()}
        >
          로그아웃
        </Button>
      </div>

      <div className="w-full h-px bg-gray-500 rounded my-4" />

      {/* <div>
        {myRegister ? (
          <>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">내 동아리 가입 신청서</span>
              <span className="text-xl text-blue-500 ml-2">가입 대기중</span>
            </div>

            <Card className="gap-4 flex items-center">
              <span className="text-xl flex items-center justify-center font-bold gap-2 text-blue-500">
                {myRegister.circle.name}
              </span>
              <TextViewer html={myRegister.message} />
              <div className="text-gray-400"></div>
            </Card>
          </>
        ) : null}
      </div> */}
    </PageContainer>
  );
}
