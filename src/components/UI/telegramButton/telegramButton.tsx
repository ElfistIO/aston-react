import { TelegramShareButton } from "react-share";

interface Props {
  cardUri: string;
  cardName: string;
}

export const TelegramButton = ({ cardUri, cardName }: Props) => {
  return (
    <TelegramShareButton url={`${encodeURI(cardUri)}`} title={cardName}>
      <i className="material-icons">telegram</i>
    </TelegramShareButton>
  );
};
