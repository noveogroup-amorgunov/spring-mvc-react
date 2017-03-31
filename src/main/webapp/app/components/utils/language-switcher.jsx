import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import localizify, {t} from 'localizify';

const LanguageSwitcher = React.createClass({

  getClass(locale) {
    return localizify.getLocale() === locale ? 'active' : '';
  },

  onChangeLocale(event) {
    if (!$(event.target).hasClass('active')) {
      const locale = $(event.target).data('locale');
      localStorage.locale = locale;
      location.reload();
    }
  },

  render() {
    return (
      <div className="language-switcher">
        <span data-locale="en" onClick={this.onChangeLocale} className={this.getClass('en')}>EN</span>
        <span data-locale="ru" onClick={this.onChangeLocale} className={this.getClass('ru')}>RU</span>
      </div>
      
    );
  }
});

export default LanguageSwitcher;