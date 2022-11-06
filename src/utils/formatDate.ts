/** YYYY-MM-DDの文字列 又は DateオブジェクトをYYYY/MM/DDの文字列に変換する関数 */
export const formatDate = (date: Date | string) => {
  // 文字列の場合
  if (typeof date === 'string') return date.replaceAll('-', '/');

  // Dateオブジェクトの場合
  const y = date.getFullYear();
  const m = ('00' + (date.getMonth() + 1)).slice(-2);
  const d = ('00' + date.getDate()).slice(-2);
  return y + '/' + m + '/' + d;
};
