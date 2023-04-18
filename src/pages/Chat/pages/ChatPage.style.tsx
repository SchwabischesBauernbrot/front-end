import styled from "styled-components";

export const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  width: 98%;
`;

export const ChatContainer = styled.div`
  height: calc(100vh - 13rem);
  padding-right: 1rem;
  overflow-y: scroll;
`;

export const BotChoicesContainer = styled.div<{ index: number }>`
  text-align: left;
  display: flex;
  min-height: 5rem;

  transition: 0.5s;
  transform: ${(props) => `translateX(-${props.index * 100}%);`}

  /* overflow-x: hidden; */
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  .ant-list-item {
	flex: 0 0 100%;
	width: 100%;
	width: 100%;
	list-style-type: none;
	display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-list-item .ant-list-item-meta {
    display: flex;
    flex: 1;
    align-items: flex-start;
    max-width: 100%;
  }

  .ant-list-item-meta-avatar {
    margin-inline-end: 0.5rem;
  }
`;

export const BotMessageControl = styled.div`
  position: absolute;
  top: 0px;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  width: 100%;
  top: 40%;
`;
