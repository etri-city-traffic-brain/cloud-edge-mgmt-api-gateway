import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const tileData = [
    {
      img: 'https://cdna.artstation.com/p/assets/images/images/000/895/940/large/puz-lee-1.jpg?1435583303',
      title: 'Breakfast',
      author: 'jill111',
      cols: 2,
      featured: true,
    },
    {
      img: 'https://cdnb.artstation.com/p/assets/images/images/000/724/773/large/puz-lee-.jpg?1443928957',
      title: 'Tasty burger',
      author: 'director90',
    },
    {
      img: 'https://cdnb.artstation.com/p/assets/images/images/000/432/535/large/puzzle-lee-.jpg?1443929510',
      title: 'Camera',
      author: 'Danson67',
    },
    {
      img: 'https://cdna.artstation.com/p/assets/images/images/000/351/364/large/puzzle-lee-1.jpg?1418380734',
      title: 'Morning',
      author: 'fancycrave1',
      featured: true,
    },
    {
      img: 'https://cdnb.artstation.com/p/assets/images/images/000/321/313/large/puzzle-lee-splash.jpg?1416968731',
      title: 'Hats',
      author: 'Hans',
    },
    {
      img: 'https://cdnb.artstation.com/p/assets/images/images/000/258/961/large/puzzle-lee-.jpg?1443930129',
      title: 'Honey',
      author: 'fancycravel',
    },
    {
      img: 'https://cdnb.artstation.com/p/assets/images/images/000/244/557/large/puzzle-lee-2.jpg?1443930315',
      title: 'Vegetables',
      author: 'jill111',
      cols: 2,
    },
    {
      img: 'https://cdnb.artstation.com/p/assets/images/images/000/208/521/large/puzzle-lee-3.jpg?1410924671',
      title: 'Water plant',
      author: 'BkrmadtyaKarki',
    },  
  ];
  

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);