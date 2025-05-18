// types/global.d.ts (you can place it in the `types/` folder or root)
export {};

declare global {
  interface Window {
    ethers?: typeof import("ethers");
  }
}
