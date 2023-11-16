import { useContext } from 'react';
import { CurrentUserCtx } from '../contexts/CurrentUserCtx';

export default () => useContext(CurrentUserCtx);
