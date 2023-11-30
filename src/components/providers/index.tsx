import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

export function Providers({ children }: PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
