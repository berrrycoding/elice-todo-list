import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { ReactQueryProvider } from "./ReactQueryProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </ReactQueryProvider>
  );
}
