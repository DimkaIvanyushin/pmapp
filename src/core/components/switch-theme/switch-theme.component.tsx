import React, { useContext } from 'react';
import { ThemeContext, Themes } from '../theme-provider/theme-provider.component';
import { Strings } from '../../common';

export function SwitchTheme() {
  const themeContext = useContext(ThemeContext);

  return (
    <select
      onChange={(e) => themeContext.changeTheme(e.target.value as Themes)}
      value={themeContext.theme}
    >
      <option value={Themes.DARK}>{Strings.dark}</option>
      <option value={Themes.LIGHT}>{Strings.light}</option>
    </select>
  );
}
