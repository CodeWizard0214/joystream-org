import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Trans } from 'gatsby-plugin-react-i18next';
import Input from '../../Input';

import { ReactComponent as SearchIcon } from '../../../assets/svg/Search.svg';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close_banner.svg';

import './style.scss';

import TextSlider from '../../TextSlider';
import GlossaryCard from '../../GlossaryCard';

function GlossaryTerms({ glossary, sliderText, cardOnClick, t }) {
  const [searchText, setSearchText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [filteredData, setFilteredData] = useState(glossary);
  const [filter, setFilter] = useState(false);
  const [select, setSelect] = useState(-1);
  const [inputClear, setInputClear] = useState(false);

  const filterData = useCallback(search => {
    const filtered = glossary.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(filtered);
  });

  const onSearchInput = e => {
    filterData(e);
    setSearchText(e);
    if (e.length !== 0) {
      setInputClear(true);
      setShowAll(true);
    } else {
      setInputClear(false);
      setShowAll(false);
    }
    setSelect(-1);
    if (e.key === 'Enter') {
      setSearchText('');
    }
  };

  useEffect(() => {
    filterData(searchText);
  }, [filterData, glossary, searchText]);

  const onSelectCarousel = e => {
    const filtered = glossary.filter(item =>
      item.title
        .toLowerCase()
        .charAt(0)
        .includes(e.toLowerCase()));
    const index = sliderText.indexOf(e);
    setSelect(index);

    setShowAll(true);
    setFilteredData(filtered);
    setSearchText('');
  };

  const onFilterClear = () => {
    setShowAll(false);
    const filtered = glossary.filter(item =>
      item.title
        .toLowerCase()
        .charAt(0)
        .includes(''));
    setFilteredData(filtered);
    setInputClear(false);
    setSearchText('');
    setSelect(-1);
  };

  useEffect(() => {
    if (searchText === '' && select === -1) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [searchText, select]);

  return (
    <div className="GlossaryTeams">
      <div>
        <div className="GlossaryTeams__head__panel">
          <div className="GlossaryTeams__head__panel__title">{t('roadmap.glossary.title')}</div>
          <div className="GlossaryTeams__head__panel__subtitle">
            {t('roadmap.glossary.subtitle')}
          </div>
        </div>
        <div className="GlossaryTeams__search__panel">
          <div className="GlossaryTeams__search__panel__input">
            <SearchIcon className="GlossaryTeams__search__panel__icon" />
            <Input
              className="GlossaryTeams__search__panel__inputbox"
              placeholder="Find interesting words..."
              type="text"
              name="interesting_words"
              required
              onChange={e => onSearchInput(e.target.value)}
              value={searchText}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
            {!inputClear ? (
              <></>
            ) : (
              <CloseIcon
                className="GlossaryTeams__search__panel__closeicon"
                onClick={() => {
                  onFilterClear(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="GlossaryTeams__body">
        <div className="GlossaryTeams__body__slider">
          <TextSlider
            slides={sliderText}
            onclick={onSelectCarousel}
            className="GlossaryTeams__body__slider__body"
            slideClassName="GlossaryTeams__body__slider__slide"
            sliderClassName="GlossaryTeams__body__slider__slider"
            select={select}
          />
          <div className="GlossaryTeams__body__slider__cards">
            {filteredData.slice(0, showAll ? glossary.length : 4).map((res, index) => {
              return (
                <GlossaryCard
                  onclick={() => {
                    const scrollY = window.scrollY;
                    localStorage.setItem('scrollPosition', scrollY);
                    localStorage.setItem('href', window.location.href);
                    cardOnClick(index);
                  }}
                  title={res.title}
                  content={res.content}
                  key={index}
                />
              );
            })}
          </div>

          {glossary.length <= 4 || filter ? (
            <></>
          ) : showAll ? (
            <button
              className="GlossaryTeams__body__slider__button"
              onClick={() => {
                setShowAll(false);
              }}
            >
              {t('roadmap.glossary.hideAll')}
            </button>
          ) : (
            <button
              className="GlossaryTeams__body__slider__button"
              onClick={() => {
                setShowAll(true);
              }}
            >
              <Trans i18nKey="roadmap.glossary.showAll" components={{ glossaryLength: glossary.length }} />
            </button>
          )}
          {!filter ? (
            <></>
          ) : (
            <button
              className="GlossaryTeams__body__slider__button"
              onClick={() => {
                onFilterClear(true);
              }}
            >
              {t('roadmap.glossary.clearAll')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlossaryTerms;
