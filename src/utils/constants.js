export const API_END_POINT = "http://localhost:8080";
export const DEBOUNCE_TIME = 500;
export const EMAIL_VALIDATION_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
export const PHONE_NUMBER_VALIDATION_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const PASSWORD_VALIDATION_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number:

  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:



export const ROLE_ADMIN = "ADMIN";
export const STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  CREATED: "CREATED",
  IN_PROGRESS: "IN PROGRESS",
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
