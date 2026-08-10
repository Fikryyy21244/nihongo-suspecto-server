export type GamePhase =
  | "category_select"
  | "playing"
  | "voting"
  | "result"
  | "game_over";

export type GameStatus = "waiting" | "playing" | "finished";

export type GameTimer = {
  startedAt: number;
  endsAt: number;
  duration: number;
};

export type Game = {
  roomId: string;

  status: GameStatus;
  phase: GamePhase;

  round: number;
  maxRounds: number;

  timer: GameTimer;
};
