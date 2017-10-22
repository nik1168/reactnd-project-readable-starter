export const CHANGE_SORT = 'CHANGE_SORT';

//SORT
export const changeSort = (sort) => ({
  type: CHANGE_SORT,
  sort
});

export const changeSortDis = (data) => dispatch=>(dispatch(changeSort(data)));

