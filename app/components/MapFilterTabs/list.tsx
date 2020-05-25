/**
 *
 * MapFilterTabs
 *
 */
import React, {memo} from 'react';
import {MapFilterResponse, MapLocationResponse} from "containers/MapDetailPage/types";
import {AutoSizer, List} from 'react-virtualized';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {isUndefined} from 'lodash';

interface Props {
  isOpen: boolean;
  onClickItem?: (selectedFilter: MapFilterResponse, selectedLocation: MapLocationResponse) => void;
  locations: MapLocationResponse[];
  filter: MapFilterResponse;
}

function MapFilterTabsList(props: Props) {
  const {filter, locations, isOpen, onClickItem} = props;

  const handleClickItem = (index: number) => {
    if (!isUndefined(onClickItem)) {
      onClickItem(filter, locations[index]);
    }
  };

  const rowRenderer = ({key, index, style}) => {
    return (
      <ListItem button style={style} key={index} onClick={() => handleClickItem(index)}>
        <ListItemAvatar>
          <Avatar
            className="map--filter-tab-item"
            variant="square"
            alt={`Location icon`}
            src={filter.icon}
          />
        </ListItemAvatar>
        <ListItemText primary={locations[index].location_name}/>
      </ListItem>
    );
  };
  return (
    <div style={{display: 'flex', height: 'calc(100vh - 142px)'}}>
      <div style={{flex: '1 1 auto'}}>
        {locations && isOpen && (
          <AutoSizer>
            {({height, width}) => (
              <List
                height={height}
                rowCount={locations.length || 0}
                rowHeight={60}
                rowRenderer={rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
}

export default memo(MapFilterTabsList);
