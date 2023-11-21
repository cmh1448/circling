import PageContainer from "@/components/pages/PageContainer";
import TabBar, { TabItem } from "@/components/tab/TabBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserManagePanel from "../panels/UserManagePanel";
import ApplicationManagePanel from "../panels/ApplicationManagePanel";
import { adjustCurrentNavBar } from "@/hooks/uiHook";
import CategoryManagePanel from "../panels/CategoryManagePanel";


export default function ManageCirclePage() {
  const { circleId } = useParams();
  const tabs: TabItem[] = [
    { name: "유저", icon: "people" },
    { name: "게시판", icon: "description" },
    { name: "가입 신청", icon: "how_to_reg" },
  ];

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  const getCurrentTabView = () => {
    if (selectedTab.name === "유저") return <UserManagePanel />;
    else if (selectedTab.name === "게시판")
      return <CategoryManagePanel circleId={Number(circleId)} />;
    else if (selectedTab.name === "가입 신청")
      return <ApplicationManagePanel circleId={Number(circleId)} />;
    else return <div></div>;
  };


  adjustCurrentNavBar(Number(circleId));
  return (
    <PageContainer>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(it) => setSelectedTab(it)}
      />
      <div className="mt-4">{getCurrentTabView()}</div>
    </PageContainer>
  );
}
