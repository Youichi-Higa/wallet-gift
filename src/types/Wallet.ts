export type Wallet = {
  id: string; // firestoreのID
  network: string; // ネットワーク
  walletAddress: string; // walletのアドレス
  secretKey: string; // 秘密鍵
  messageToRecipient: string; // 受取人へのメッセージ
  publicType: 'now' | 'future'; // 公開時期(今すぐ or 未来日)
  publicDate: Date | string; // firestoreに送信する値はDate、フォームからの取得値はYYYY-MM-DDの文字列
};
