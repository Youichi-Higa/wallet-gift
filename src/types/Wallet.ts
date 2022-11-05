export type Wallet = {
  id: string;
  network: string;
  walletAddress: string;
  secretKey: string;
  messageToRecipient: string;
  publicType: "now" | "future";
  publicDate: Date | string;
};