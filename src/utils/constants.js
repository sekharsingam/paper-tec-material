export const API_END_POINT = "http://localhost:8080";
export const DEBOUNCE_TIME = 500;
export const ROLE_ADMIN = "ADMIN";
export const STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  DELIVERED: "DELIVERED",
  PROCESSING: "PROCESSING",
  READY_FOR_DELIVERY: "READY FOR DELIVERY",
  OUT_FOR_DELIVERY: "OUT FOR DELIVERY",
  PICK_UP: "PICK UP",
  PAID: "PAID",
  DUE: "DUE",
};

export const getStatusColor = (status) => {
  if (status === STATUS.APPROVED) {
    return "info";
  }
  if (
    status === STATUS.ACCEPTED ||
    status === STATUS.COMPLETED ||
    status === STATUS.DELIVERED
  ) {
    return "success";
  }
  if (status === STATUS.REJECTED) {
    return "error";
  }
  return "info";
};

export const numberFormat = (number) =>
  new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(number);
