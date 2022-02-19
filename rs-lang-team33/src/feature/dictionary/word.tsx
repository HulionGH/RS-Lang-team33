import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { baseURL } from "../../constants";
import { IWordCard } from "../../interfaces";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
interface Props {
  card: IWordCard;
}
const Word = ({ card }: Props) => {
  const imgSrc = `${baseURL}${card.image}`;
  const audioSrc = `${baseURL}${card.audio}`;
  const audioMeanSrc = `${baseURL}${card.audioMeaning}`;
  const audioExampleSrc = `${baseURL}${card.audioExample}`;

  const start = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  return (
    <Card sx={{}}>
      <CardContent>
        <CardMedia component="img" height="150" image={imgSrc} alt="xx" />
        <Button size="small">Difficult word</Button>
      </CardContent>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {card.word}
          </Typography>
          <p> - </p>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {card.transcription}
          </Typography>
          <p> - </p>
          <Typography gutterBottom variant="h6" component="div">
            {card.wordTranslate}
          </Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20 }}
            onClick={() => start(audioSrc)}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: card.textMeaning || "" }}
          ></Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20 }}
            onClick={() => start(audioMeanSrc)}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: card.textMeaningTranslate || "" }}
        ></Typography>

        <hr className="hr-medium" />
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: card.textExample || "" }}
          ></Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20 }}
            onClick={() => start(audioExampleSrc)}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: card.textExampleTranslate || "" }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default Word;
