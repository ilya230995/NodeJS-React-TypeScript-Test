import { RootState } from '../store';
import { LoadingResultsT } from '../../types/loading';

export const getIsUserAuthorized = (state: RootState): boolean => state.authorization?.isUserAuthorizated;

export const getAuthLoading = (state: RootState): LoadingResultsT => state.authorization?.loading;

export const getAuthError = (state: RootState): number | null | undefined => state.authorization?.error;

export const getAuthErrorMessage = (state: RootState): string | undefined => state.authorization?.errorMessage;
