export default function formatCurrency(num) {
  return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}

export function AvaibleCurrency(str) {
  return String(str) + "";
}
