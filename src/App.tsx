// react-loading-skeleton 라이브러리의 설정파일입니다.
// 공식문서를 참고해주세요. https://github.com/dvtng/react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css";
import Main from "./components/pages/Main";
import { Providers } from "./components/providers";

export default function App() {
  return (
    <Providers>
      <Main />
    </Providers>
  );
}
