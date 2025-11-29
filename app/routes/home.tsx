import { useRef, useState } from "react";
import type { Route } from "./+types/home";
import {
  Box,
  Button,
  Card,
  Input,
  List,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bullshit Bingo" },
    { name: "description", content: "Free bullshit bingo" },
  ];
}

const bingoWidth = 4;
const bingoHeight = 4;
export default function Home({}: Route.ComponentProps) {
  const inputRef = useRef<any>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [words, setWords] = useState([] as string[]);
  const [wordMatrix, setWordMatrix] = useState([] as string[]);
  // The indexes that are marked
  const [markedWords, setMarkedWords] = useState({} as Record<number, boolean>);

  const addWord = () => {
    setWords((current) => [...current, currentWord]);
    setCurrentWord("");
    inputRef.current?.focus();
  };

  const startGame = () => {
    setWordMatrix(shuffle(words).slice(0, bingoWidth * bingoHeight));
    setGameStarted(true);
  };

  if (gameStarted) {
    return (
      <Box sx={{ p: 2, maxWidth: 800 }}>
        <Typography level="h1">Bullshit Bingo</Typography>

        <Box sx={{ mt: 3 }} className="grid-4-4">
          {wordMatrix.map((w, i) => (
            <Card
              sx={{
                backgroundColor: markedWords[i] ? "springgreen" : "#f2f2f2",
              }}
              onClick={() => setMarkedWords((mw) => ({ ...mw, [i]: !mw[i] }))}
            >
              {w}
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            sx={{ marginRight: 2 }}
            onClick={() => {
              setMarkedWords({});
              startGame();
            }}
          >
            Neustart (gleiche Wörter)
          </Button>
          <Button
            onClick={() => {
              setMarkedWords({});
              setWordMatrix([]);
              setWords([]);
              setGameStarted(false);
            }}
          >
            Neustart (neue Wörter)
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 800 }}>
      <Typography level="h1">Bullshit Bingo</Typography>
      <Sheet sx={{ mt: 3, p: 2, minHeight: 300, backgroundColor: "#f8f8f8" }}>
        <Input
          ref={inputRef}
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          endDecorator={<Button onClick={addWord}>Hinzufügen</Button>}
        />

        <List marker="disc" sx={{ marginTop: 3 }}>
          {words.map((w) => (
            <ListItem key={w}>{w}</ListItem>
          ))}
        </List>

        <Button
          disabled={words.length < bingoHeight * bingoWidth}
          onClick={startGame}
        >
          Start
        </Button>
      </Sheet>
    </Box>
  );
}

function shuffle<T>(a: T[]): T[] {
  let array = [...a];
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
