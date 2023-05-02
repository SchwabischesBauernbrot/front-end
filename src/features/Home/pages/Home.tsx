import { useQuery } from "react-query";
import styled from "styled-components";
import { Typography, Spin, Segmented, Radio } from "antd";

import { PageContainer } from "../../../shared/components/shared";
import { supabase } from "../../../config";
import { ChatEntityWithCharacter } from "../../../types/backend-alias";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../appContext";
import { ChatList } from "../../../shared/components";
import { Link } from "react-router-dom";
import {
  CharacterListWrapper,
  SearchParams,
} from "../../../shared/components/CharacterListWrapper";
import { EyeFilled, EyeInvisibleFilled, HeartFilled } from "@ant-design/icons";

const { Title } = Typography;

type Segment = "latest" | "popular" | "nsfw" | "female" | "male" | "anime" | "game";

const SegmentContainer = styled.div`
  max-width: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Home: React.FC = () => {
  const { profile, localData, updateLocalData } = useContext(AppContext);
  const [segment, setSegment] = useState<Segment>("latest");

  const params: SearchParams | undefined = useMemo(() => {
    const modeParams = { mode: localData.character_view || "sfw" };

    switch (segment) {
      case "latest":
        return modeParams;
      case "popular":
        return { sort: "popular", ...modeParams };
      // Lol hard code for now
      case "female":
        return { tag_id: 2, ...modeParams };
      case "male":
        return { tag_id: 1, ...modeParams };
      case "anime":
        return { tag_id: 9, ...modeParams };
      case "game":
        return { tag_id: 8, ...modeParams };
    }
  }, [segment, localData]);

  const { data: chatData, isLoading: isChatLoading } = useQuery(
    ["chats", profile?.id],
    async () => {
      const responses = await supabase
        .from("chats")
        .select("*, characters(name, description, avatar)")
        .order("updated_at", { ascending: false })
        .order("created_at", { ascending: false })
        .eq("user_id", profile?.id)
        .limit(4)
        .returns<ChatEntityWithCharacter[]>();

      const chats = responses.data;
      return chats?.filter((chat) => chat.characters); // Character can be null if deleted or privated
    },
    { enabled: !!profile }
  );

  return (
    <PageContainer align="left">
      {profile && (
        <div>
          {isChatLoading && <Spin />}
          {chatData && chatData.length > 0 && (
            <div className="mb-4">
              <Title level={2}>
                Continue Chats <Link to="/my_chats">(All Chats)</Link>
              </Title>

              <ChatList size="small" chats={chatData} />
            </div>
          )}
        </div>
      )}

      <Radio.Group
        className="mb-4"
        defaultValue={localData.character_view || "sfw"}
        onChange={(e) => updateLocalData({ character_view: e.target.value })}
      >
        <Radio.Button value="all">
          <EyeFilled /> All
        </Radio.Button>
        <Radio.Button value="sfw">
          <EyeInvisibleFilled /> SFW Only
        </Radio.Button>
        <Radio.Button value="nsfw">
          <HeartFilled /> NSFW Only
        </Radio.Button>
      </Radio.Group>
      <SegmentContainer>
        <Segmented
          value={segment}
          onChange={(value) => setSegment(value as Segment)}
          options={[
            {
              label: "⚡️ Latest",
              value: "latest",
            },
            {
              label: "🔥 Most Popular",
              value: "popular",
            },
            {
              label: "👩‍🦰 Female",
              value: "female",
            },
            {
              label: "👨‍🦰 Male",
              value: "male",
            },
            {
              label: "📺 Anime",
              value: "anime",
            },
            {
              label: "🎮 Game",
              value: "game",
            },
          ]}
        />
      </SegmentContainer>

      <CharacterListWrapper size="small" cacheKey="main_page" additionalParams={params} />
    </PageContainer>
  );
};
