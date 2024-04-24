export interface UsernameValidityInterface {
  firstName?: boolean;
  firstDot?: boolean;
  lastName?: boolean;
  secondDot?: boolean;
  day?: boolean;
  firstSlash?: boolean;
  month?: boolean;
  secondSlash?: boolean;
  year?: boolean;
}

export const checkProUsernameValidity = (username: string) => {
  // eslint-disable-next-line no-useless-escape
  const re = /([\w\-\.]+[\-\.][\w\-\.]+)/;
  return re.test(String(username).toLowerCase());
};

export const checkUserNameValidity = (username: string) => {
  const userNameValidity: UsernameValidityInterface = {
    firstName: false,
    lastName: false,
    firstDot: false,
    secondDot: false,
    day: false,
    firstSlash: false,
    secondSlash: false,
    month: false,
    year: false,
  };
  if (username === null || username === void [0]) {
    return userNameValidity;
  }
  const splittedUserName = username.split('.');
  if (splittedUserName.length >= 0 && splittedUserName[0].length > 1) {
    userNameValidity.firstName = true;
  }
  if (splittedUserName.length >= 2) {
    userNameValidity.firstDot = true;
  }
  if (splittedUserName.length >= 2 && splittedUserName[1].length > 0) {
    userNameValidity.lastName = true;
  }
  if (splittedUserName.length >= 3) {
    userNameValidity.secondDot = true;
  }
  if (splittedUserName.length === 3 && splittedUserName[2].length > 0) {
    const splittedDate = splittedUserName[2].split('/');
    if (splittedDate.length >= 1 && splittedDate[0].length === 2 && !Number.isNaN(Number(splittedDate[0]))) {
      userNameValidity.day = true;
    }
    if (splittedDate.length >= 2) {
      userNameValidity.firstSlash = true;
    }
    if (splittedDate.length >= 2 && splittedDate[1].length === 2 && !Number.isNaN(Number(splittedDate[1]))) {
      userNameValidity.month = true;
    }
    if (splittedDate.length >= 3) {
      userNameValidity.secondSlash = true;
    }
    if (splittedDate.length >= 3 && splittedDate[2].length === 4 && !Number.isNaN(Number(splittedDate[2]))) {
      userNameValidity.year = true;
    }
  }

  return userNameValidity;
};
