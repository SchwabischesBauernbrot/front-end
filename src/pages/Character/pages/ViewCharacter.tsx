import {
  Typography,
  Spin,
  Row,
  Col,
  Avatar,
  App,
  Space,
  Tag,
  Tooltip,
  Button,
  Collapse,
  Descriptions,
  message,
} from "antd";
import { LoadingOutlined, WechatOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { PageContainer } from "../../../components/shared";
import { axiosInstance, supabase } from "../../../config";
import { getBotAvatarUrl } from "../../../services/utils";
import { FullCharacterView } from "../../../types/backend-alias";
import { Tokenizer } from "../../../services/character-parse/tokenizer";
import { MultiLine } from "../../../components/MultiLine";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../appContext";
import { PrivateIndicator } from "../../../components/PrivateIndicator";
import { chatService } from "../../../services/chat/chat-service";

const { Title } = Typography;

export const ViewCharacter: React.FC = () => {
  const { characterId } = useParams();
  const { modal } = App.useApp();

  const navigate = useNavigate();
  const [isStartingChat, setIsStartingChat] = useState(false);
  const { profile } = useContext(AppContext);

  // Get character
  const { data, isLoading } = useQuery(
    ["view_character", characterId],
    async () => {
      const response = await axiosInstance.get<FullCharacterView>(`/characters/${characterId}`);
      return response.data;
    },
    { enabled: !!characterId }
  );

  const startChat = useCallback(async () => {
    if (!profile) {
      modal.info({
        title: "Login to start chat!",
        content: (
          <span>
            Please <a href="/login">Login</a> or <a href="/register">Regsiter</a> so that your chats
            and setting can be saved!
          </span>
        ),
      });
      return;
    }

    try {
      setIsStartingChat(true);
      const existingChat = await supabase
        .from("chats")
        .select("id")
        .match({ user_id: profile.id, character_id: characterId })
        .order("created_at", { ascending: false })
        .maybeSingle();

      if (existingChat.data) {
        navigate(`/chats/${existingChat.data.id}`);
      } else {
        const newChat = await chatService.createChat(characterId!);

        if (newChat) {
          navigate(`/chats/${newChat.id}`);
        }
      }
    } catch (err) {
      message.error(JSON.stringify(err, null, 2));
    } finally {
      setIsStartingChat(false);
    }
  }, [profile]);

  return (
    <PageContainer>
      {isLoading && <Spin />}
      {!isLoading && !data && <p>Can not view this character. It might be deleted or private.</p>}

      {data && (
        <Row>
          <Col span={6} className="text-left pt-2 pb-2">
            <Title level={3}>
              <PrivateIndicator isPublic={data.is_public} /> {data.name}
            </Title>

            <Avatar shape="square" size={100} src={getBotAvatarUrl(data.avatar)} />

            <div className="mt-2">
              <Link target="_blank" to={`/profiles/${data.creator_id}`}>
                <span>@{data.creator_name}</span>
              </Link>
              <p>{data.description}</p>
            </div>

            <Space size={[0, 8]} wrap>
              {data.is_nsfw ? <Tag color="error">🔞 NSFW</Tag> : ""}
              {data.tags?.map((tag) => (
                <Tooltip key={tag.id} title={tag.description}>
                  <Tag>{tag.name}</Tag>
                </Tooltip>
              ))}
            </Space>

            <div className="pr-4 mt-4">
              <Button type="primary" block onClick={startChat} disabled={isStartingChat}>
                {isStartingChat ? <LoadingOutlined /> : <WechatOutlined />} Chat with {data.name}
              </Button>
            </div>
          </Col>

          <Col span={18} className="text-left">
            <Collapse>
              <Collapse.Panel
                header={`Character definition (Total ${Tokenizer.tokenCountFormat(
                  data.personality + data.first_message + data.scenario + data.example_dialogs
                )}) - May contains spoiler`}
                key="1"
              >
                <Descriptions bordered size="small">
                  <Descriptions.Item
                    label={`Personality (${Tokenizer.tokenCountFormat(data.personality)})`}
                    span={3}
                  >
                    <MultiLine>{data.personality}</MultiLine>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={`First Message (${Tokenizer.tokenCountFormat(data.first_message)})`}
                    span={3}
                  >
                    <MultiLine>{data.first_message}</MultiLine>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={`Scenario (${Tokenizer.tokenCountFormat(data.scenario)})`}
                    span={3}
                  >
                    <MultiLine>{data.scenario}</MultiLine>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={`Example Dialogs (${Tokenizer.tokenCountFormat(data.example_dialogs)})`}
                    span={3}
                  >
                    <MultiLine>{data.example_dialogs}</MultiLine>
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      )}
    </PageContainer>
  );
};
