import api from "@/api";
import Icon from "@/components/base/Icon";
import Input from "@/components/base/Input";
import SlideDlialog, {
  SlideDialogProps,
} from "@/components/dialog/SlideDialog";
import Fallback from "@/components/fallback/fallback";
import Suspense from "@/components/suspense/Suspense";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

interface NewChatDialogProps extends Omit<SlideDialogProps, "children"> {}

export default function NewChatDialog(props: NewChatDialogProps) {
  const { data: users, isLoading } = useQuery(["fetchAvailableUsers"], () =>
    api.chat.fetchAvailableUsers()
  );

  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredUsers = useMemo(() => {
    if (searchKeyword.trim() === "") {
      return users;
    } else {
      return users?.filter((user) => {
        const fullName = user.lastName + " " + user.firstName;
        const email = user.email;
        return (
          fullName.includes(searchKeyword) || email.includes(searchKeyword)
        );
      });
    }
  }, [searchKeyword, users]);

  const navigate = useNavigate();
  const handleStartChat = (email: string) => {
    navigate(`/chat/${email}`);
  };

  return (
    <SlideDlialog {...props}>
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">새로운 채팅</div>
          <div className="text-gray-400">채팅할 상대를 선택해주세요</div>
        </div>
        <div className="mt-4 flex-1">
          <Input
            placeholder="이름으로 검색..."
            icon="search"
            onInput={setSearchKeyword}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <Suspense isLoading={isLoading}>
          <Fallback when={users?.length === 0} message="채팅할 상대가 없어요">
            {filteredUsers?.map((user) => (
              <div
                className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-lg select-none active:scale-95 transition-all"
                onClick={() => handleStartChat(user.email)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Icon icon="person" className="text-gray-500" fill />
                </div>
                <div className="flex flex-col flex-1 ">
                  <span className="text-lg font-bold h-7">
                    {user.lastName + " " + user.firstName}
                  </span>
                  <span className="text-sm text-gray-400 h-5">
                    {user.email}
                  </span>
                </div>
              </div>
            ))}
          </Fallback>
        </Suspense>
      </div>
    </SlideDlialog>
  );
}
