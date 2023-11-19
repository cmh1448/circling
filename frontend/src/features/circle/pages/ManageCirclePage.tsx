import PageContainer from "@/components/pages/PageContainer";
import TabBar, { TabItem } from "@/components/tab/TabBar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ManageCirclePage() {
  const { circleId } = useParams();
  const tabs: TabItem[] = [
    { name: "유저", icon: "people" },
    { name: "게시판", icon: "description" },
    { name: "가입 신청", icon: "how_to_reg" },
  ];

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  return (
    <PageContainer>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(it) => setSelectedTab(it)}
      />
      Managing {circleId}
    </PageContainer>
  );
}
