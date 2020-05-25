/**
 *
 * SearchPlace
 *
 */
import React, {memo} from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  ILocationAroundMe
} from 'containers/MapDetailPage/types';

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  iconSearch: {
    color: 'rgb(246,109,44)',
    cursor: 'pointer'
  },
}));

interface Props {
  inputSearch: string;
  setInputSearch: (inputSearch: string) => void;
  searchLocation: (inputSearch: string) => void;
  dataSearch: ILocationAroundMe[];
  setShowSearch?: (isSearch: boolean) => void;
  clearDirectionData?: () => void;
}

function SearchPlace(props: Props) {
  const { inputSearch, setInputSearch, searchLocation, setShowSearch, clearDirectionData } = props;
  const classes = useStyles();

  const handleChange = (event: any) => {
    if(event.target.value && event.target.value[0] === ' ') { return; }
    event.persist();
    setInputSearch(event.target.value); 
  };

  const onEnterSearch = () => {
    searchLocation(inputSearch || '');
  };
  const clearSearch = () => {
    setInputSearch('');
    setShowSearch!(false);
    clearDirectionData!();
  };

  return (
    <CssTextField
      value={inputSearch}
      onChange={handleChange}
      className={classes.root}
      placeholder="Search your place here"
      fullWidth
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onEnterSearch();
        }
      }}
      margin="normal"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            { inputSearch && inputSearch !== '' ? (
              <CloseIcon onClick={() => clearSearch()} className={classes.iconSearch}/>
            ) : (
              <SearchIcon onClick={() => onEnterSearch()} className={classes.iconSearch}/>
            )}
            
          </InputAdornment>
        ),
      }}
      id="custom-css-outlined-input"
    />
  );
}

export default memo(SearchPlace);
