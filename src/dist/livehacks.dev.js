"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatCurrency;
exports.AvaibleCurrency = AvaibleCurrency;

function formatCurrency(num) {
  return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}

function AvaibleCurrency(str) {
  return String(str) + "";
}