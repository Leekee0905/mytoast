import Toast from "./components/Toast";
import { showToast } from "./services/showToast";

function App() {
  return (
    <>
      <button onClick={() => showToast("에러입니다", "error", "bottom-left")}>
        에러
      </button>
      <button onClick={() => showToast("잘됨!", "success", "bottom-right")}>
        성공
      </button>
      <button onClick={() => showToast("그냥 토스트", "", "top-right")}>
        그냥 토스트
      </button>
      <button
        onClick={() => showToast("짱 빠른 토스트", "success", "top-left", true)}
      >
        빠른 토스트
      </button>
      <Toast />
    </>
  );
}

export default App;
