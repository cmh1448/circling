import Button from "@/components/base/Button";
import PageContainer from "@/components/pages/PageContainer";
import { authStore } from "@/stores/authStore";
import { DateTime } from "luxon";
import { useStore } from "zustand";

export default function ProfilePage() {
  const authContext = useStore(authStore);

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
    </PageContainer>
  );
}
