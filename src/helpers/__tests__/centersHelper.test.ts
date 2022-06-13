import { basicCenter2, basicCenters } from '../../fixtures/centerFixtures';
import { acceptCenterInList } from '../centersHelper';

describe('acceptCenterInList', (): void => {
  it('Should set the b_valid field in the concerned center', (): void => {
    expect(basicCenters[0].b_valid).toBe(true);
    expect(basicCenters[1].b_valid).toBe(false);
    const newList = acceptCenterInList(basicCenters, basicCenter2);
    expect(newList.length).toBe(2);
    expect(newList[0].b_valid).toBe(true);
    expect(newList[1].b_valid).toBe(true);
    const newList2 = acceptCenterInList(newList, basicCenter2);
    expect(newList).toEqual(newList2);
  });
});
