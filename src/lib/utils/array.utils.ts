export function isEmpty(arr?: any[]) {
  return !arr || arr.length === 0;
}

export function isNotEmpty(arr?: any[]) {
  return !isEmpty(arr);
}

export function areEqual(array1: any[], array2: any[]) {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }
      return false;
    });
  }
  return false;
}

/**
 *
 * @param array1
 * @param array2
 * @returns Substracts elements of array2 from array1
 */
export function difference(array1: any[], array2: any[]) {
  if (!array1.length) {
    return [];
  }

  return array1.filter((element) => !array2?.includes(element));
}
