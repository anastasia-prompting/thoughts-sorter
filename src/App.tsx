import { PauseOverlay } from "./components/PauseOverlay";
import { GameScreen } from "./screens/GameScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { StartScreen } from "./screens/StartScreen";
import { StatsScreen } from "./screens/StatsScreen";
import { TutorialScreen } from "./screens/TutorialScreen";
import { useGameStore } from "./store/gameStore";

function App() {
  const { screen, progress, lastResult, startRound, setScreen, setPaused } = useGameStore(
    (state) => state,
  );

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden text-mist">
      {screen === "start" && (
        <StartScreen
          onStart={startRound}
          onTutorial={() => setScreen("tutorial")}
          onSettings={() => setScreen("settings")}
        />
      )}

      {screen === "tutorial" && (
        <TutorialScreen onStart={startRound} onBack={() => setScreen("start")} />
      )}

      {(screen === "playing" || screen === "paused") && <GameScreen />}

      {screen === "paused" && <PauseOverlay onContinue={() => setPaused(false)} />}

      {screen === "results" && lastResult && (
        <ResultsScreen
          result={lastResult}
          onRetry={startRound}
          onStats={() => setScreen("stats")}
          onHome={() => setScreen("start")}
        />
      )}

      {screen === "stats" && <StatsScreen progress={progress} onBack={() => setScreen("start")} />}
      {screen === "settings" && <SettingsScreen onBack={() => setScreen("start")} />}
    </main>
  );
}

export default App;
