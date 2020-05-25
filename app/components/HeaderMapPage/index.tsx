/**
 *
 * HeaderMapPage
 *
 */
import React, {memo} from 'react';
import {Container} from '@material-ui/core';
import './header-map.scss';
import SearchPlace from "../SearchPlace";

interface Props {
  inputSearch: string;
  setInputSearch: (inputSearch: string) => void;
  searchLocation: (inputSearch: string) => void;
  dataSearch: any;
}

function HeaderMapPage(props: Props) {
  const {inputSearch, setInputSearch, searchLocation, dataSearch} = props;
  return (
    <>
      <Container className="header--map-page">
        <div className="map--pager-search">
          <SearchPlace
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
            searchLocation={searchLocation}
            dataSearch={dataSearch}
          />
        </div>
      </Container>
    </>
  );
}

export default memo(HeaderMapPage);
