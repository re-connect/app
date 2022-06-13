import { checkProUsernameValidity, checkUserNameValidity } from '../usernameValidation';

const beneficiaryUsernames = {
  valid: 'gandalf.legris.29/07/1954',
  yearNotANumber: 'gandalf.legris.29/07/195d',
  yearTooShort: 'gandalf.legris.29/07/195',
  monthTooShort: 'gandalf.legris.29/0/1954',
  monthNotANumber: 'gandalf.legris.29/er/1954',
  dayNotANumber: 'gandalf.legris.er/07/1954',
  dayMissing: 'gandalf.legris./07/1954',
  noYear: 'gandalf.legris.29/07/',
  noSecondSlash: 'gandalf.legris.29/07',
  noMonth: 'gandalf.legris.29/',
  noFirstSlash: 'gandalf.legris.29',
  noDate: 'gandalf.legris.',
  noSecondDot: 'gandalf.legris',
  noLastName: 'gandalf.',
  noFirstDot: 'gandalf',
  oneLetterFirstname: 'a',
  empty: '',
};

const memberUsernames = {
  username: {
    valid: 'legris.gandalf',
    noDot: 'legrisgandalf',
    noFirstName: 'legris.',
    onlyLastName: 'legris',
  },
};

describe('checkUserNameValidity', () => {
  it('Should return all true if valid', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.valid);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeTruthy();
  });
  it('Should set year to false if not a number', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.yearNotANumber);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set year to false if too short', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.yearTooShort);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set year to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noYear);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the secondSlash and next fields to false if too short', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noSecondSlash);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the month to false if too short', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.monthTooShort);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeTruthy();
  });
  it('Should set the month to false if not a number', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.monthTooShort);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeTruthy();
  });
  it('Should set the month and following fields to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noMonth);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the firstSlash and following fields to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noFirstSlash);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeTruthy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the day to false if not a number', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.dayNotANumber);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeTruthy();
  });
  it('Should set the day to false if missing', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.dayMissing);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeTruthy();
    expect(validity.month).toBeTruthy();
    expect(validity.secondSlash).toBeTruthy();
    expect(validity.year).toBeTruthy();
  });
  it('Should set the day and all following fields to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noDate);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeTruthy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the secondDot and all following fields to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noSecondDot);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeTruthy();
    expect(validity.secondDot).toBeFalsy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the lastName and all following fields to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noLastName);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeTruthy();
    expect(validity.lastName).toBeFalsy();
    expect(validity.secondDot).toBeFalsy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set the firstDot and all following fields to false if not filled', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.noFirstDot);
    expect(validity.firstName).toBeTruthy();
    expect(validity.firstDot).toBeFalsy();
    expect(validity.lastName).toBeFalsy();
    expect(validity.secondDot).toBeFalsy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set everything to false if only one letter', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.oneLetterFirstname);
    expect(validity.firstName).toBeFalsy();
    expect(validity.firstDot).toBeFalsy();
    expect(validity.lastName).toBeFalsy();
    expect(validity.secondDot).toBeFalsy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should set everything to false if field is empty', () => {
    const validity = checkUserNameValidity(beneficiaryUsernames.empty);
    expect(validity.firstName).toBeFalsy();
    expect(validity.firstDot).toBeFalsy();
    expect(validity.lastName).toBeFalsy();
    expect(validity.secondDot).toBeFalsy();
    expect(validity.day).toBeFalsy();
    expect(validity.firstSlash).toBeFalsy();
    expect(validity.month).toBeFalsy();
    expect(validity.secondSlash).toBeFalsy();
    expect(validity.year).toBeFalsy();
  });
  it('Should return all false if we pass null or undefined', () => {
    const validityNull = checkUserNameValidity(null);
    expect(validityNull.firstName).toBeFalsy();
    expect(validityNull.firstDot).toBeFalsy();
    expect(validityNull.lastName).toBeFalsy();
    expect(validityNull.secondDot).toBeFalsy();
    expect(validityNull.day).toBeFalsy();
    expect(validityNull.firstSlash).toBeFalsy();
    expect(validityNull.month).toBeFalsy();
    expect(validityNull.secondSlash).toBeFalsy();
    expect(validityNull.year).toBeFalsy();
    const validityUndefined = checkUserNameValidity();
    expect(validityUndefined.firstName).toBeFalsy();
    expect(validityUndefined.firstDot).toBeFalsy();
    expect(validityUndefined.lastName).toBeFalsy();
    expect(validityUndefined.secondDot).toBeFalsy();
    expect(validityUndefined.day).toBeFalsy();
    expect(validityUndefined.firstSlash).toBeFalsy();
    expect(validityUndefined.month).toBeFalsy();
    expect(validityUndefined.secondSlash).toBeFalsy();
    expect(validityUndefined.year).toBeFalsy();
  });
});

describe('checkProUsernameValidity', () => {
  it('Should validate the member username format', () => {
    expect(checkProUsernameValidity(memberUsernames.username.noDot)).toBeFalsy();
    expect(checkProUsernameValidity(memberUsernames.username.noFirstName)).toBeFalsy();
    expect(checkProUsernameValidity(memberUsernames.username.onlyLastName)).toBeFalsy();
    expect(checkProUsernameValidity(memberUsernames.username.valid)).toBeTruthy();
  });
});
