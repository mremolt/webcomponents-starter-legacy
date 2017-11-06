import {
  createSelectorCreator,
  defaultMemoize,
  createSelector as cs,
} from 'reselect';
import { is } from 'immutable';

/**
 * Small wrapper around reselect [[createSelector]], that knows how to compare ImmutableJS data structures.
 */
export const createSelector: typeof cs = createSelectorCreator(
  defaultMemoize,
  is
);
